// @flow
import React, { Component } from 'react'
import './index.css'
import AudioManager from 'data/classes/AudioManager'


function loadSample (url: string, audioContext: AudioContext, callback: (file: any, originalPath: string) => mixed) {
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
}

class Step extends Component<Props, State> {
  constructor (props: Props) {
    super (props)

    this.state = {
      cachedSample: undefined,
    }

    this.playSound = this.playSound.bind(this)
  }

  playSound = () => {
    const { instrument, audioManager } = this.props

    if (this.state.cachedSample && this.state.cachedSample.file) {
      // Now for the fun part :)
      var source = audioManager.context.createBufferSource(); // creates a sound source
      source.buffer = this.state.cachedSample.file
      source.connect(audioManager.context.destination)
      source.start(0)
    } else {
      loadSample(instrument.samplePath, audioManager.context, (file, originalPath) => this.setState({ cachedSample: { file: file, originalPath: originalPath } }))
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
