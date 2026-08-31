import { useState, useEffect, useRef } from 'react'
import * as Tone from 'tone'
import Pad from './Pad'
import './BeatMaker.css'

interface BeatMakerProps {
  isPlaying: boolean
}

interface Synth {
  triggerAttackRelease: (note: string, duration: string) => void
}

const BeatMaker = ({ isPlaying }: BeatMakerProps) => {
  const synthRef = useRef<Synth | null>(null)
  const [bpm, setBpm] = useState(120)
  const [notes] = useState(['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'])
  const [steps, setSteps] = useState<Set<string>>(new Set())
  const stepCounterRef = useRef(0)

  useEffect(() => {
    // Create synth
    synthRef.current = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'triangle' },
      envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0,
        release: 0.1,
      },
    }).toDestination()

    // Set initial BPM
    Tone.Transport.bpm.value = bpm

    return () => {
      if (synthRef.current) {
        synthRef.current.dispose()
      }
    }
  }, [])

  useEffect(() => {
    Tone.Transport.bpm.value = bpm
  }, [bpm])

  useEffect(() => {
    if (!isPlaying) {
      stepCounterRef.current = 0
      return
    }

    const now = Tone.now()
    const stepDuration = 0.25 // 16th notes

    // Schedule notes
    const scheduleStep = (stepIndex: number) => {
      const stepNote = `${stepIndex % 8}-${Math.floor(stepIndex / 8)}`
      if (steps.has(stepNote) && synthRef.current) {
        synthRef.current.triggerAttackRelease(notes[stepIndex % 8], '8n')
      }
    }

    // Create a loop
    const loopId = Tone.Loop((time) => {
      scheduleStep(stepCounterRef.current)
      stepCounterRef.current = (stepCounterRef.current + 1) % (8 * 8)
    }, stepDuration).start(0)

    return () => {
      loopId.dispose()
    }
  }, [isPlaying, steps, notes])

  const toggleStep = (note: string, step: number) => {
    const stepId = `${note}-${step}`
    const newSteps = new Set(steps)
    if (newSteps.has(stepId)) {
      newSteps.delete(stepId)
    } else {
      newSteps.add(stepId)
    }
    setSteps(newSteps)
  }

  const clearAll = () => {
    setSteps(new Set())
  }

  return (
    <div className="beat-maker">
      <div className="beat-maker-controls">
        <div className="bpm-control">
          <label>BPM: {bpm}</label>
          <input
            type="range"
            min="60"
            max="200"
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            className="bpm-slider"
          />
        </div>
        <button className="clear-btn" onClick={clearAll}>
          🗑️ Clear All
        </button>
      </div>

      <div className="beat-grid">
        {notes.map((note, noteIndex) => (
          <div key={note} className="beat-row">
            <div className="note-label">{note}</div>
            <div className="pads-row">
              {Array.from({ length: 16 }).map((_, stepIndex) => (
                <Pad
                  key={`${note}-${stepIndex}`}
                  isActive={steps.has(`${noteIndex}-${stepIndex}`)}
                  onClick={() => toggleStep(`${noteIndex}`, stepIndex)}
                  isPlaying={isPlaying && stepCounterRef.current === noteIndex * 16 + stepIndex}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BeatMaker
