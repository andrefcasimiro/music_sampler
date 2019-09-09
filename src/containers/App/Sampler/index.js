// @flow
import React, { Component } from 'react'
import Instrument from './Instrument'
// $Ignore
import kick from 'assets/data/samples/Kick.WAV'
// $Ignore
import snare from 'assets/data/samples/Snare.WAV'
// $Ignore
import clhat from 'assets/data/samples/ClosedHat.WAV'
// $Ignore
import ohat from 'assets/data/samples/OpenHat.WAV'
// $Ignore
import clap from 'assets/data/samples/Clap.WAV'
// $Ignore
import bass from 'assets/data/samples/Bass.wav'
// $Ignore
import pad from 'assets/data/samples/PAD.mp3'
// $Ignore
import axios from 'axios'
// $Ignore
import { MdFileUpload as UploadIcon } from "react-icons/md"
// $Ignore
import { FiTrash2 as RemoveIcon } from "react-icons/fi"
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
    id: string,
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
        steps: window.innerWidth > 880 ? 16 : 8,
        linesPerBeat: 4,
      },
      sequencer: {
        currentPosition: 0,
      },
      instruments: [
        {
          id: String(0 + Date.now()),
          name: 'Kick',
          samplePath: kick,
        },
        {
          id: String(1 + Date.now()),
          name: 'Snare',
          samplePath: snare,
        },
        {
          id: String(2 + Date.now()),
          name: 'Closed Hat',
          samplePath: clhat,
        },
        {
          id: String(3 + Date.now()),
          name: 'Open Hat',
          samplePath: ohat,
        },
        {
          id: String(4 + Date.now()),
          name: 'Clap',
          samplePath: clap,
        },
        {
          id: String(5 + Date.now()),
          name: 'Bass',
          samplePath: bass,
        },
        {
          id: String(6 + Date.now()),
          name: 'Pad',
          samplePath: pad,
        },
      ],
    }

    // Sequencer Logic
    this.handleChange = this.handleChange.bind(this)
    this.handlePlay = this.handlePlay.bind(this)
    this.manageNextPosition = this.manageNextPosition.bind(this)
    // Add Instruments
    this.addNewInstrument = this.addNewInstrument.bind(this)
    // Delete Instruments
    this.onDelete = this.onDelete.bind(this)
    // Edit A Instrument
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
    nextProps.audioManagerAllowed
      ? this.handlePlay()
      : this.handleStop()
  }

  // Add new instruments
  addNewInstrument = () => {
    this.setState({
      instruments: this.state.instruments.concat({
        id: String(this.state.instruments.length + Date.now()),
        name: 'Instrument ' + this.state.instruments.length,
        samplePath: '',
      })
    })
  }

  onDelete = (index: string) => {
    const _newInstrumentList = this.state.instruments.filter(instrument => {
      return instrument.id !== index
    })


    this.setState({
      instruments: _newInstrumentList,
    })
  }

  // Instrument Edit

  editName = (index: string) => (event: SyntheticInputEvent<*>) => {
    const value = event.target.value
    const instruments = this.state.instruments
    const target = instruments.find(instrument => instrument.id === index)
    instruments[instruments.indexOf(target)].name = value

    this.setState({
      instruments,
    })
  }

  editSamplePath = (index: string) => (event: SyntheticInputEvent<*>) => {
    const data = new FormData()
    data.append('file', event.target.files[0])

    const postURI = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
      ? 'http://localhost:8000/upload'
      : 'https://react-drum-machine-sampler.herokuapp.com'
      
    axios.post(postURI, data, {})
         .then(response => {
           console.log(response)
           if (response.status === 200) {
             const filePath = 'public/uploads/' + response.data.filename
             const instruments = this.state.instruments
             const target = instruments.find(instrument => instrument.id === index)
             instruments[instruments.indexOf(target)].samplePath = filePath

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
        {instruments.length > 0 &&
          <div className='instrumentGrid'>
            {instruments.map((instrument, index) => (
              <Instrument
                key={instrument.id}
                instrument={instrument}
                sequencer={this.state.sequencer}
                settings={this.state.settings}
                audioManager={this.props.audioManager}
              >
                <input type="text" value={instrument.name} onChange={(this.editName)(instrument.id)} />
                
                <div className="row">
                  <input name={instrument.id} id={instrument.id} className="inputfile" type="file" onChange={(this.editSamplePath)(instrument.id)} />
                  <label for={instrument.id}><UploadIcon /></label>

                  <button className="buttonRemove" onClick={() => this.onDelete(instrument.id)}><RemoveIcon /></button>
                </div>
              </Instrument>
            )
          )}
          </div>
        }

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
