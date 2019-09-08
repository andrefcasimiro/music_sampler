// @flow
import React, { Component } from 'react'
import AudioManager from 'data/classes/AudioManager'
import {
  IoIosPlay as PlayIcon,
  IoIosPause as PauseIcon,
 } from "react-icons/io"
import Sampler from './Sampler'
import './index.css'

type Props = {}

type State = {
  audioManager: AudioManager,
  audioManagerAllowed: boolean,
}

class App extends Component<Props, State> {
  constructor (props: Props) {
    super (props)

    this.state = {
      audioManager: new AudioManager(),
      audioManagerAllowed: false,
    }

    this.resumeAudioContext = this.resumeAudioContext.bind(this)
  }

  resumeAudioContext = () => {
    if (this.state.audioManager) {
      this.state.audioManagerAllowed
        ? this.state.audioManager.context.suspend()
        : this.state.audioManager.context.resume()

      this.setState({ audioManagerAllowed: !this.state.audioManagerAllowed })
    }
  }

  render() {
    return (
      <div className="container">
        <button onClick={this.resumeAudioContext}>
          {this.state.audioManagerAllowed
            ? <span><PauseIcon /> Stop</span>
            : <span><PlayIcon /> Play</span>
          }
        </button>

        <Sampler
          audioManagerAllowed={this.state.audioManagerAllowed}
          audioManager={this.state.audioManager}
        />
      </div>
    )
  }
}

export default App
