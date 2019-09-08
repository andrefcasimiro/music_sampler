// @flow
import React, { Component, type Node } from 'react'
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
  children: Node,
}

type State = {
}

class Instrument extends Component<Props, State> {
  render () {

    return (
      <React.Fragment>
        <div className="stepsGrid">
          <div className='step default edit'>
            {this.props.children}
          </div>
          {generateContentBasedOnSteps('step', this.props)}
        </div>
      </React.Fragment>
    )
  }

}

export default Instrument
