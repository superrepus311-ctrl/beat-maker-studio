import { useState, useEffect, useRef, useCallback } from 'react'
import * as Tone from 'tone'
import Pad from './Pad'
import './BeatMaker.css'

interface BeatMakerProps {
  isPlaying: boolean
}

const BeatMaker = ({ isPlaying }: BeatMakerProps) => {
  const synthRef = useRef<Tone.PolySynth<Tone.Synth> | null>(null)
  const [bpm, setBpm] = useState(120)
  const [notes] = useState(['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'])
  const [steps, setSteps] = useState<Set<string>>(new Set())
  const [volume, setVolume] = useState(-12)
  const [currentStep, setCurrentStep] = useState(0)
  const stepCounterRef = useRef(0)
  const loopRef = useRef<Tone.Loop | null>(null)

  // Initialize synth
  useEffect(() => {
    synthRef.current = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'triangle' },
      envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0,
        release: 0.1,
      },
    }).toDestination()

    // Set initial volume and BPM
    if (synthRef.current) {
      synthRef.current.volume.value = volume
    }
    Tone.Transport.bpm.value = bpm

    return () => {
      if (synthRef.current) {
        synthRef.current.dispose()
      }
    }
  }, [])

  // Update BPM when it changes
  useEffect(() => {
    Tone.Transport.bpm.value = bpm
  }, [bpm])

  // Update volume when it changes
  useEffect(() => {
    if (synthRef.current) {
      synthRef.current.volume.value = volume
    }
  }, [volume])

  // Main playback loop
  useEffect(() => {
    if (loopRef.current) {
      loopRef.current.dispose()
      loopRef.current = null
    }

    if (!isPlaying) {
      stepCounterRef.current = 0
      setCurrentStep(0)
      return
    }

    const stepDuration = 0.25 // 16th notes
    const totalSteps = 16

    const scheduleStep = (stepIndex: number) => {
      const step = stepIndex % totalSteps
      for (let noteIndex = 0; noteIndex < notes.length; noteIndex++) {
        const stepId = `${noteIndex}-${step}`
        
        if (steps.has(stepId) && synthRef.current) {
          synthRef.current.triggerAttackRelease(notes[noteIndex], '8n')
        }
      }
      
      setCurrentStep(step)
      stepCounterRef.current = (stepCounterRef.current + 1) % totalSteps
    }

    // Create and start loop
    loopRef.current = new Tone.Loop((time) => {
      scheduleStep(stepCounterRef.current)
    }, stepDuration)
    
    loopRef.current.start(0)

    return () => {
      if (loopRef.current) {
        loopRef.current.dispose()
        loopRef.current = null
      }
    }
  }, [isPlaying, steps, notes])

  const toggleStep = useCallback((noteIndex: number, step: number) => {
    const stepId = `${noteIndex}-${step}`
    setSteps((prev) => {
      const newSteps = new Set(prev)
      if (newSteps.has(stepId)) {
        newSteps.delete(stepId)
      } else {
        newSteps.add(stepId)
      }
      return newSteps
    })
  }, [])

  const clearAll = useCallback(() => {
    setSteps(new Set())
  }, [])

  const savePattern = useCallback(() => {
    const pattern = Array.from(steps)
    localStorage.setItem('beatMakerPattern', JSON.stringify(pattern))
    alert('Pattern saved!')
  }, [steps])

  const loadPattern = useCallback(() => {
    const saved = localStorage.getItem('beatMakerPattern')
    if (saved) {
      try {
        const pattern = JSON.parse(saved)
        setSteps(new Set(pattern))
        alert('Pattern loaded!')
      } catch (error) {
        alert('Failed to load pattern')
      }
    } else {
      alert('No saved pattern found')
    }
  }, [])

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

        <div className="volume-control">
          <label>Volume: {volume}dB</label>
          <input
            type="range"
            min="-60"
            max="0"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="volume-slider"
          />
        </div>

        <div className="button-group">
          <button className="clear-btn" onClick={clearAll}>
            🗑️ Clear
          </button>
          <button className="save-btn" onClick={savePattern}>
            💾 Save
          </button>
          <button className="load-btn" onClick={loadPattern}>
            📂 Load
          </button>
        </div>
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
                  onClick={() => toggleStep(noteIndex, stepIndex)}
                  isPlaying={isPlaying && currentStep === stepIndex}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="step-indicator">
        Step: <span className="step-number">{currentStep + 1}</span> / 16
      </div>
    </div>
  )
}

export default BeatMaker