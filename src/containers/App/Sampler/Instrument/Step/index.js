// @flow
import React, { Component } from 'react'
import './index.css'

type Props = {
  active: boolean,
  marker: boolean,
}

type State = {}

class Step extends Component<Props, State> {
  constructor (props: Props) {
    super (props)

    this.state = {
    }
  }

  render() {
    const { marker, active } = this.props

    let className = 'step '
    className = marker ? className + 'marker ' : className
    className = active ? className + 'active ' : className

    return (
      <div className={className}>

      </div>
    )
  }

}

export default Step
