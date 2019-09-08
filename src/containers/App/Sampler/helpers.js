// @flow
import React from 'react'
import BPMIndicator from './BPMIndicator'
import Step from './Instrument/Step'

export var generateContentBasedOnSteps = (type: 'step' | 'bpm', state: any) => {
  let groupedContent = []

  for (let i = 0; i < state.settings.steps; i++) {
    var active = i === state.sequencer.currentPosition
    var marker = i % 4

    groupedContent.push(
      type === 'step'
        ? <Step key={i} position={i} active={active} marker={!!marker} instrument={state.instrument} audioManager={state.audioManager} />
        : <BPMIndicator key={i} active={active} marker={!!marker} />
      )
  }

  return groupedContent
}
