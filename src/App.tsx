import { useState, useEffect } from 'react'
import * as Tone from 'tone'
import BeatMaker from './components/BeatMaker'
import './App.css'

function App() {
  const [isAudioReady, setIsAudioReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initAudio = async () => {
      try {
        // Enable audio context on user interaction
        const handleInteraction = async () => {
          try {
            await Tone.start()
            setIsAudioReady(true)
            setError(null)
            // Remove listener after successful initialization
            document.removeEventListener('click', handleInteraction)
            document.removeEventListener('keydown', handleInteraction)
          } catch (err) {
            console.error('Failed to start audio:', err)
            setError('Failed to initialize audio. Please try clicking again.')
          }
        }

        // Add listeners for first user interaction
        document.addEventListener('click', handleInteraction)
        document.addEventListener('keydown', handleInteraction)

        return () => {
          document.removeEventListener('click', handleInteraction)
          document.removeEventListener('keydown', handleInteraction)
        }
      } catch (error) {
        console.error('Audio initialization error:', error)
        setError('Failed to initialize audio system')
      }
    }

    initAudio()
  }, [])

  const handlePlayToggle = () => {
    if (!isAudioReady) {
      setError('Audio engine not ready. Please click to initialize.')
      return
    }

    try {
      if (Tone.Transport.state === 'started') {
        Tone.Transport.stop()
        setIsPlaying(false)
      } else {
        Tone.Transport.start()
        setIsPlaying(true)
      }
      setError(null)
    } catch (error) {
      console.error('Playback error:', error)
      setError('Failed to toggle playback')
    }
  }

  const handleStop = () => {
    try {
      Tone.Transport.stop()
      setIsPlaying(false)
      setError(null)
    } catch (error) {
      console.error('Stop error:', error)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎵 Beat Maker Studio</h1>
        <p>Create beats with Tone.js</p>
      </header>

      <main className="app-main">
        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {isAudioReady ? (
          <>
            <div className="controls">
              <button
                className={`play-btn ${isPlaying ? 'playing' : ''}`}
                onClick={handlePlayToggle}
              >
                {isPlaying ? '⏸ Pause' : '▶ Play'}
              </button>
              {isPlaying && (
                <button
                  className="stop-btn"
                  onClick={handleStop}
                >
                  ⏹ Stop
                </button>
              )}
            </div>
            <BeatMaker isPlaying={isPlaying} />
          </>
        ) : (
          <div className="loading">
            <p>🔊 Click anywhere to initialize audio engine...</p>
            <div className="loading-spinner"></div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Made with React + Tone.js • Production Ready v1.0</p>
        <p className="audio-status">
          {isAudioReady ? '✅ Audio Ready' : '⏳ Initializing...'}
        </p>
      </footer>
    </div>
  )
}

export default App