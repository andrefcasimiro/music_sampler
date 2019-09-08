// @flow
import React, { Component } from 'react'
import { generateContentBasedOnSteps } from '../helpers'
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
}

type State = {
}

class Instrument extends Component<Props, State> {
  constructor (props: Props) {
    super (props)

    this.state = {

    }
  }

  render () {

    return (
      <React.Fragment>
        <div className="stepsGrid">
          <div className='step default'>{this.props.instrument.name}</div>
          {generateContentBasedOnSteps('step', this.props)}
        </div>
      </React.Fragment>
    )
  }

}

export default Instrument
