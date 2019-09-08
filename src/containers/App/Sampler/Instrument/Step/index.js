// @flow
import React, { Component } from 'react'
import './index.css'
import AudioManager from 'data/classes/AudioManager'


function loadSample (url: string, audioContext: AudioContext) {
  var request = new XMLHttpRequest()

  url = url.replace('public/', '/')

  console.log('new filepath: ', url)
  request.open('GET', url, true)
  request.responseType = 'arraybuffer'


  // Decode asynchronously
  request.onload = function () {
    audioContext.decodeAudioData(request.response, function (buffer) {
      // Now for the fun part :)
      var source = audioContext.createBufferSource(); // creates a sound source
      source.buffer = buffer
      source.connect(audioContext.destination)
      source.start(0)
    }, () => console.log('error'))
  }

  request.send()
}

type Props = {
  position: number,
  active: boolean,
  marker: boolean,
  instrument: {
    name: string,
    samplePath: string,
  },
  audioManager: AudioManager,
}

type State = {
  selected: boolean,
}

class Step extends Component<Props, State> {
  constructor (props: Props) {
    super (props)

    this.state = {
      selected: false,
    }

    this.playSound = this.playSound.bind(this)
    this.toggleSelect = this.toggleSelect.bind(this)
  }

  playSound = () => {
    const { instrument, audioManager } = this.props

    loadSample(instrument.samplePath, audioManager.context)
  }

  toggleSelect = () => {
    this.setState({
      selected: !this.state.selected,
    })
  }

  render() {
    const { selected } = this.state
    const { marker, active, position } = this.props

    let className = 'step '
    className = marker ? className + 'marker ' : className
    className = active ? className + 'active ' : className
    className = selected ? className + 'selected ' : className

    // If sequencer has reached this step
    if (active) {

      // If step has a note in this position
      if (selected) {
        this.playSound()
      }
    }

    return (
      <div className={className} onClick={this.toggleSelect} />
    )
  }

}

export default Step
