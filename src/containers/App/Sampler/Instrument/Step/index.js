// @flow
import React, { Component } from 'react'
import './index.css'
// $Ignore
import { 
  MdSettings as SettingsIcon,
  MdAddCircleOutline as AddIcon, 
  MdRemoveCircleOutline as RemoveIcon, 
} from 'react-icons/md'
import AudioManager from 'data/classes/AudioManager'


function loadSample (url: string, audioContext: AudioContext, pitch = 1, volume = 1, callback: (file: any, originalPath: string) => mixed) {
  var request = new XMLHttpRequest()

  var originalUrl = url
  url = url.replace('public/', '/')

  request.open('GET', url, true)
  request.responseType = 'arraybuffer'


  // Decode asynchronously
  request.onload = function () {
    audioContext.decodeAudioData(request.response, function (buffer) {
      // Now for the fun part :)
      var source = audioContext.createBufferSource(); // creates a sound source

      // Pitch
      source.playbackRate.value = pitch
      // Volume
      var gainNode = audioContext.createGain()
      gainNode.gain.value = volume
      gainNode.connect(audioContext.destination)
      source.connect(gainNode)

      source.buffer = buffer
      source.connect(audioContext.destination)
      source.start(0)

      callback(buffer, originalUrl) // Cache the sample
    }, () => {})
  }

  request.send()
}

type Props = {
  active: boolean,
  marker: boolean,
  instrument: {
    name: string,
    samplePath: string,
  },
  audioManager: AudioManager,
  onSelect: Function,
  selection: Array<boolean>,
  selectionID: number,
}

type State = {
  cachedSample: ?{
    file: any,
    originalPath: string,
  },
  isOpen: boolean,
  pitch: number,
  volume: number,
}

class Step extends Component<Props, State> {
  constructor (props: Props) {
    super (props)

    this.state = {
      cachedSample: undefined,
      pitch: 1,
      volume: 1,
      isOpen: false,
    }

    this.playSound = this.playSound.bind(this)
    this.setPitch = this.setPitch.bind(this)
    this.setVolume = this.setVolume.bind(this)
    this.reset = this.reset.bind(this)
    this.toggleOpen = this.toggleOpen.bind(this)
  }

  playSound = () => {
    const { instrument, audioManager } = this.props

    if (this.state.cachedSample && this.state.cachedSample.file) {
      // Now for the fun part :)
      var source = audioManager.context.createBufferSource(); // creates a sound source
      source.buffer = this.state.cachedSample.file

      // Pitch
      source.playbackRate.value = this.state.pitch
      // Volume
      var gainNode = audioManager.context.createGain()
      gainNode.gain.value = this.state.volume
      gainNode.connect(audioManager.context.destination)
      source.connect(gainNode)

      source.connect(audioManager.context.destination)
      source.start(0)
    } else {
      loadSample(instrument.samplePath, audioManager.context, this.state.pitch, this.state.volume, (file, originalPath) => this.setState({ cachedSample: { file: file, originalPath: originalPath } }))
    }
  }

  componentWillReceiveProps(newProps: Props) {
    if (!this.state.cachedSample) { return }
    
    if (this.state.cachedSample.originalPath !== newProps.instrument.samplePath) {
      console.log('new file was uploaded, we need to remove the cached sample and make the client request the new sample')

      this.setState({
        cachedSample: undefined,
      })
    }
  }

  // Context Menus
  toggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  // Effects
  setPitch = (value: number) => {

    this.setState({
      pitch: value,
    })
  }
  setVolume = (value: number) => {

    this.setState({
      volume: value,
    })
  }
  reset = () => {
    this.setState({
      pitch: 1,
      volume: 1,
    })
  }

  render() {
    const selected = this.props.selection[this.props.selectionID]
    const { marker, active } = this.props

    let className = 'step '
    className = marker ? className + 'stepMarker ' : className
    className = active ? className + 'stepActive ' : className
    className = selected ? className + 'stepSelected ' : className

    // If sequencer has reached this step
    if (active) {
      if (selected) {
        this.playSound()
      }
    }

    return (
      <React.Fragment>
        <div className={className} onClick={() => this.props.onSelect(this.props.selectionID)} />
        <div className="optionWrapper">
          {selected && <button className="option" onClick={this.toggleOpen}><SettingsIcon /></button>}
        </div>
        {this.state.isOpen && selected &&
          <div className="contextMenuWrapper">
            <div className="contextMenu">
              <p>
                <RemoveIcon onClick={() => this.setPitch(this.state.pitch - 0.05)} />
                <p>Pitch: {(this.state.pitch).toFixed(2)}</p>
                <AddIcon onClick={() => this.setPitch(this.state.pitch + 0.05)} />
              </p>
              <p>
                <RemoveIcon onClick={() => this.setVolume((this.state.volume - 0.1))} />
                <p>Volume: {(this.state.volume).toFixed(2)}</p>
                <AddIcon onClick={() => this.setVolume((this.state.volume + 0.1))} />
              </p>
              <p>
                <button onClick={() => this.reset()}>Reset</button>
              </p>
            </div>
          </div>
        }
      </React.Fragment>
    )
  }

}

export default Step
