// @flow
import React, { Component } from 'react'
import './index.css'

type Props = {
  audioManagerAllowed: boolean,
}

type State = {
  settings: {
    tempo: number,
    steps: number,
  },
  sequencer: {
    currentPosition: number,
  },
}

var timerID

class Sampler extends Component<Props, State> {
  constructor (props: Props) {
    super (props)

    this.state = {
      settings: {
        tempo: 120,
        steps: 16,
      },
      sequencer: {
        currentPosition: 0,
      },
    }

    this.handleChange = this.handleChange.bind(this)
    this.generateContentBasedOnSteps = this.generateContentBasedOnSteps.bind(this)
    this.handlePlay = this.handlePlay.bind(this)
    this.manageNextPosition = this.manageNextPosition.bind(this)
  }

  // Song Settings

  handleChange = (event: SyntheticInputEvent<*>) => {
    const name = event.target.name
    const value = event.target.value

    this.setState({
      settings: {
        ...this.state.settings,
        [name]: value,
      },
    })
  }

  generateContentBasedOnSteps = (type: 'step' | 'bpm') => {
    let groupedContent = []

    for (let i = 0; i < this.state.settings.steps; i++) {

      var marker = i % 4
      var className = marker ? `${type} mark` : type

      groupedContent.push(<div key={i} className={className} />)
    }

    return groupedContent
  }

  // Sequencer Logic Here

  manageNextPosition = () => {
    const { currentPosition } = this.state.sequencer
    const { steps } = this.state.settings

    console.log('current Position: ', currentPosition)

    if (currentPosition + 1 >= steps) {
      console.log('resert position')
      return this.setState({
        sequencer: {
          ...this.state.sequencer,
          currentPosition: 0,
        },
      })
    } else {
      console.log('go to next position', this.state.sequencer.currentPosition + 1)
      return this.setState({
        sequencer: {
          ...this.state.sequencer,
          currentPosition: this.state.sequencer.currentPosition + 1,
        },
      })
    }
  }

  handlePlay = () => {
    // Every Beats Per Minute / 60, Advance One Position
    // If Next Position Is After Number Of Steps, Return To 0
    timerID = setInterval(
      () => this.manageNextPosition(),
    1000)
  }

  handleStop = () => {
    clearInterval(timerID)
  }

  componentWillUnmount() {
    this.handleStop()
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.audioManagerAllowed) {
      this.handlePlay()
    } else {
      this.handleStop()
    }
  }


  render() {

    return (
      <div className="settingsContainer">
        <div className="setting">
          <p>BPM:</p>
          <input type='text' name='tempo' value={this.state.settings.tempo} onChange={this.handleChange} />
          <p>Steps:</p>
          <input type='text' name='steps' value={this.state.settings.steps} onChange={this.handleChange} />
        </div>

        {/* Bpm Indicator */}
        <div className='bpmGrid'>
          <div className='bpm default empty' /> {/* Simple offset to match the instrument grid logic below */}
          {this.generateContentBasedOnSteps('bpm')}
        </div>

        {/* For Each Instrument, Have a Grid With The Steps */}
        <div className='instrumentGrid'>
          <div className='step default'>Instrument 1</div>
          {this.generateContentBasedOnSteps('step')}
        </div>
      </div>
    )
  }
}

export default Sampler
