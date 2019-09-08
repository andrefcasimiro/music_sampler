// @flow
import React, { Component } from 'react'
import './index.css'
import AudioManager from 'data/classes/AudioManager'


function loadSample (url: string, audioContext: AudioContext) {
  var request = new XMLHttpRequest()

  url = url.replace('public/', '/')

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
}

class Step extends Component<Props, State> {
  constructor (props: Props) {
    super (props)

    this.playSound = this.playSound.bind(this)
  }

  playSound = () => {
    const { instrument, audioManager } = this.props

    loadSample(instrument.samplePath, audioManager.context)
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
      <div className={className} onClick={() => this.props.onSelect(this.props.selectionID)} />
    )
  }

}

export default Step
