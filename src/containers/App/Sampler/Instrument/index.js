// @flow
import React, { Component, type Node } from 'react'
import Step from './Step'
import './index.css'
import AudioManager from 'data/classes/AudioManager'

type Props = {
  audioManager: AudioManager,
  settings: {
    tempo: number,
    steps: number,
    linesPerBeat: number,
  },
  sequencer: {
    currentPosition: number,
  },
  instrument: {
    name: string,
    samplePath: string,
  },
  children: Node,
}

type State = {
  selection: Array<boolean>,
}

class Instrument extends Component<Props, State> {
  constructor(props: Props) {
    super (props)

    var initial = []
    for (let i = 0; i < this.props.settings.steps; i++) {
      initial.push(false)
    }

    this.state = {
      selection: initial,
    }

    this.drawSteps = this.drawSteps.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect = (index: number) => {
    const selectedSteps = this.state.selection
    selectedSteps[index] = !selectedSteps[index]

    this.setState({
      selection: selectedSteps,
    })
  }

  drawSteps = () => {
    let groupedContent = []

    for (let i = 0; i < this.props.settings.steps; i++) {
      var active = i === this.props.sequencer.currentPosition
      var marker = i % 4

      groupedContent.push(
        <Step
          key={i}
          active={active}
          marker={!!marker}
          instrument={this.props.instrument}
          audioManager={this.props.audioManager}
          onSelect={this.handleSelect}
          selection={this.state.selection}
          selectionID={i}
        />
      )
    }

    return groupedContent
  }

  render () {

    return (
      <React.Fragment>
        <div className="stepsGrid">
          <div className='step default edit'>
            {this.props.children}
          </div>

          {this.drawSteps()}
        </div>
      </React.Fragment>
    )
  }

}

export default Instrument
