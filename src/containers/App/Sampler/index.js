// @flow
import React, { Component } from 'react'
import Instrument from './Instrument'
// $Ignore
import kick from 'assets/data/samples/TR-909/Kick.WAV'
// $Ignore
import snare from 'assets/data/samples/TR-909/Snare.WAV'
// $Ignore
import axios from 'axios'
import { generateContentBasedOnSteps } from './helpers'
import AudioManager from 'data/classes/AudioManager'
import './index.css'


type Props = {
  audioManagerAllowed: boolean,
  audioManager: AudioManager,
}

type State = {
  settings: {
    tempo: number,
    steps: number,
    linesPerBeat: number,
  },
  sequencer: {
    currentPosition: number,
  },
  instruments: Array<{
    name: string,
    samplePath: string,
  }>
}

var timerID

class Sampler extends Component<Props, State> {
  constructor (props: Props) {
    super (props)

    this.state = {
      settings: {
        tempo: 120,
        steps: 16,
        linesPerBeat: 4,
      },
      sequencer: {
        currentPosition: 0,
      },
      instruments: [
        {
          name: 'Kick',
          samplePath: kick,
        },
        {
          name: 'Snare',
          samplePath: snare,
        }
      ]
    }

    this.handleChange = this.handleChange.bind(this)
    this.handlePlay = this.handlePlay.bind(this)
    this.manageNextPosition = this.manageNextPosition.bind(this)
    this.addNewInstrument = this.addNewInstrument.bind(this)
    this.onDelete = this.onDelete.bind(this)


    this.editName = this.editName.bind(this)
    this.editSamplePath = this.editSamplePath.bind(this)
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

  // Sequencer Logic Here

  manageNextPosition = () => {
    const { currentPosition } = this.state.sequencer
    const { steps } = this.state.settings

    if (currentPosition + 1 >= steps) {

      this.setState({
        sequencer: {
          ...this.state.sequencer,
          currentPosition: 0,
        },
      })
    } else {

      this.setState({
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


    // 1 minute = 60 seconds = 60,000 milliseconds
    // Single Beat- Quarter Note
    // 60 000 / (bpm / linesPerBeat) = desired ms for a quarter note

    // Never allow tempo or lpb to be 0 or it will produce insane fast intervals
    const tempo = this.state.settings.tempo || 1
    const linesPerBeat = this.state.settings.linesPerBeat || 1
    const interval = ((Math.pow(10, 4) * 6) / linesPerBeat) / tempo

    timerID = setInterval(
      () => this.manageNextPosition(),
      interval,
    )
  }

  handleStop = () => {
    clearInterval(timerID)
  }

  componentWillUnmount() {
    this.handleStop()
  }

  componentDidUpdate(nextProps: Props, nextState: State) {
    if (this.state.settings !== nextState.settings) {
      this.handleStop()

      if (nextProps.audioManagerAllowed) {
        this.handlePlay()
      }
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.audioManagerAllowed) {
      this.handlePlay()
    } else {
      this.handleStop()
    }
  }

  // Add new instruments
  addNewInstrument = () => {
    this.setState({
      instruments: this.state.instruments.concat({
        name: 'S' + this.state.instruments.length,
        samplePath: '',
      })
    })
  }

  onDelete = (_index: number) => {
    const _newInstrumentList = this.state.instruments.filter((instrument, index) => {
      return index !== _index
    })


    this.setState({
      instruments: _newInstrumentList,
    })
  }

  // Instrument Edit

  editName = (index: number) => (event: SyntheticInputEvent<*>) => {
    const value = event.target.value
    const instruments = this.state.instruments
    instruments[index].name = value

    this.setState({
      instruments,
    })
  }

  editSamplePath = (index: number) => (event: SyntheticInputEvent<*>) => {
    const data = new FormData()
    data.append('file', event.target.files[0])
    axios.post('http://localhost:8000/upload', data, {})
         .then(response => {
           console.log(response)
           console.log(response.statusText)
           if (response.status === 200) {
             const filePath = 'public/uploads/' + response.data.filename

             console.log('new file path: ', filePath)


             const instruments = this.state.instruments
             instruments[index].samplePath = filePath

             // Update component state with new sample path
             this.setState({
               instruments,
             })
           }
         })
         .catch(err => console.log('upload failed: ', err))
  }


  render() {

    const instruments = this.state.instruments

    return (
      <div className="settingsContainer">
        <div className="setting">
          <p>BPM:</p>
          <input type='number' name='tempo' value={this.state.settings.tempo} onChange={this.handleChange} min={1} />
          <p>Steps:</p>
          <input type='number' name='steps' value={this.state.settings.steps} onChange={this.handleChange} min={1} />
          <p>Lines Per Beat:</p>
          <input type='number' name='linesPerBeat' value={this.state.settings.linesPerBeat} onChange={this.handleChange} min={1} />
        </div>

        {/* Bpm Indicator */}
        <div className='bpmGrid'>
          <div className='bpm default empty' /> {/* Simple offset to match the instrument grid logic below */}
          {generateContentBasedOnSteps('bpm', this.state)}
        </div>

        {/* For Each Instrument, Have a Grid With The Steps */}
        <div className='instrumentGrid'>
          {instruments.map((instrument, index) =>
            <Instrument
              key={index}
              instrument={instrument}
              sequencer={this.state.sequencer}
              settings={this.state.settings}
              audioManager={this.props.audioManager}
            >
              <input type="text" value={instrument.name} onChange={(this.editName)(index)} />
              <input type="file" onChange={(this.editSamplePath)(index)} />

              <button onClick={() => this.onDelete(index)}>[Delete]</button>
            </Instrument>
          )}
        </div>

        {/* Add / remove instrument menu */}
        <div className='addNewInstrument' onClick={this.addNewInstrument}>
          <div className='emptyStep'><p>+</p></div> {/* Simple offset to match the instrument grid logic below */}
          {generateContentBasedOnSteps('placeholder', this.state)}
        </div>
      </div>
    )
  }
}

export default Sampler