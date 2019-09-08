// @flow
import React, { Component } from 'react'
import './index.css'

type Props = {
  active: boolean,
  marker: boolean,
}

type State = {}

class BPMIndicator extends Component<Props, State> {
  constructor (props: Props) {
    super (props)

    this.state = {
    }
  }

  render() {
    const { marker, active } = this.props

    let className = 'bpm '
    className = marker ? className + 'bpmMarker ' : className
    className = active ? className + 'bpmActive ' : className

    return (
      <div className={className} />
    )
  }

}

export default BPMIndicator
