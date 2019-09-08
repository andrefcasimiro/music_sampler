// @flow
const AudioContext = window.AudioContext || window.webkitAudioContext

class AudioManager {
  context: typeof AudioContext
  bufferSize: number
  processor: any

  constructor (synth: any) {
    this.context = new AudioContext({
      latencyHint: 'interactive',
      sampleRate: 44100,
    })

    this.bufferSize = 4096

    this.processor = this.context
      .createScriptProcessor(this.bufferSize, 0, 1)
    this.processor
      .onaudioprocess = this.audioCallback.bind(this)
    this.processor
      .connect(this.context.destination)

    // Don't enable by default, instead allow user to initialize the AudioContext
    this.context.suspend()
  }

  audioCallback (event: any) {}
}

export default AudioManager
