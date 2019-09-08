// @flow
import React from 'react'
import BPMIndicator from './BPMIndicator'

export var generateContentBasedOnSteps = (type: 'bpm' | 'placeholder', state: any) => {
  let groupedContent = []

  for (let i = 0; i < state.settings.steps; i++) {
    var active = i === state.sequencer.currentPosition
    var marker = i % 4

    groupedContent.push(
      type === 'placeholder'
        ? <BPMIndicator key={i} active={false} marker={!!marker} />
        : <BPMIndicator key={i} active={active} marker={!!marker} />
    )
  }

  return groupedContent
}
