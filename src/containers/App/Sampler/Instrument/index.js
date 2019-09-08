// @flow
import React, { Component } from 'react'
import { generateContentBasedOnSteps } from '../helpers'
import './index.css'
import axios from 'axios'
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
  name: string,
  samplePath: string,
}

class Instrument extends Component<Props, State> {
  constructor (props: Props) {
    super (props)

    this.state = {
      // Copy initial instrument created in the Sampler parent
      name: this.props.instrument.name,
      samplePath: this.props.instrument.samplePath,
    }

    this.editName = this.editName.bind(this)
    this.editSamplePath = this.editSamplePath.bind(this)
  }

  editName = (event: SyntheticInputEvent<*>) => {
    const value = event.target.value

    this.setState({
      name: value,
    })
  }

  editSamplePath = (event: SyntheticInputEvent<*>) => {
    const data = new FormData()
    data.append('file', event.target.files[0])
    axios.post('http://localhost:8000/upload', data, {})
         .then(response => {
           console.log(response)
           console.log(response.statusText)
           if (response.status === 200) {
             const filePath = 'public/uploads/' + response.data.filename

             console.log('new file path: ', filePath)
             // Update component state with new sample path
             this.setState({
               samplePath: filePath,
             })
           }
         })
         .catch(err => console.log('upload failed: ', err))
  }

  render () {

    // Replace props.instrument with state.instrument in case we make changes to this instrument (change name or sample path)
    const _props = {
      ...this.props,
      instrument: {
        name: this.state.name,
        samplePath: this.state.samplePath,
      }
    }

    return (
      <React.Fragment>
        <div className="stepsGrid">
          <div className='step default edit'>
            <input type="text" value={this.state.name} onChange={this.editName}/>
            <input type="file" onChange={this.editSamplePath}/>
          </div>
          {generateContentBasedOnSteps('step', _props)}
        </div>
      </React.Fragment>
    )
  }

}

export default Instrument
