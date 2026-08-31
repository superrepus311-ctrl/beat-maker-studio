import { useState, useEffect } from 'react'
import * as Tone from 'tone'
import BeatMaker from './components/BeatMaker'
import './App.css'

function App() {
  const [isAudioReady, setIsAudioReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const initAudio = async () => {
      try {
        await Tone.start()
        setIsAudioReady(true)
      } catch (error) {
        console.error('Failed to initialize audio:', error)
      }
    }

    initAudio()
  }, [])

  const handlePlayToggle = () => {
    if (!isAudioReady) return

    if (Tone.Transport.state === 'started') {
      Tone.Transport.stop()
      setIsPlaying(false)
    } else {
      Tone.Transport.start()
      setIsPlaying(true)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎵 Beat Maker Studio</h1>
        <p>Create beats with Tone.js</p>
      </header>

      <main className="app-main">
        {isAudioReady ? (
          <>
            <div className="controls">
              <button
                className={`play-btn ${isPlaying ? 'playing' : ''}`}
                onClick={handlePlayToggle}
              >
                {isPlaying ? '⏸ Stop' : '▶ Play'}
              </button>
            </div>
            <BeatMaker isPlaying={isPlaying} />
          </>
        ) : (
          <div className="loading">
            <p>🔊 Click anywhere to start the audio engine...</p>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Made with React + Tone.js</p>
      </footer>
    </div>
  )
}

export default App
