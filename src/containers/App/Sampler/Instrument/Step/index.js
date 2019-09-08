// @flow
import React, { Component } from 'react'
import './index.css'
import AudioManager from 'data/classes/AudioManager'

function loadSample (url: string, audioContext: AudioContext) {
  var request = new XMLHttpRequest()

  request.open('GET', url, true)
  request.responseType = 'arraybuffer'

  // Decode asynchronously
  request.onload = function () {
    audioContext.decodeAudioData(request.response, function (buffer) {
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

type State = {}

class Step extends Component<Props, State> {
  constructor (props: Props) {
    super (props)

    this.state = {
    }

    this.playSound = this.playSound.bind(this)
  }

  playSound = () => {
    const { instrument, audioManager } = this.props

    loadSample(instrument.samplePath, audioManager.context)
  }

  render() {
    const { marker, active, position } = this.props

    let className = 'step '
    className = marker ? className + 'marker ' : className
    className = active ? className + 'active ' : className

    // If sequencer has reached this step
    if (active) {

      // If step has a note in this position
      if (position === 3) {
        console.log('play sound')

        this.playSound()


      }
    }

    return (
      <div className={className}>

      </div>
    )
  }

}

export default Step
