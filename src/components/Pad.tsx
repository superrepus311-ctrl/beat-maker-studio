import './Pad.css'

interface PadProps {
  isActive: boolean
  onClick: () => void
  isPlaying?: boolean
}

const Pad = ({ isActive, onClick, isPlaying = false }: PadProps) => {
  return (
    <button
      className={`pad ${isActive ? 'active' : ''} ${isPlaying ? 'playing' : ''}`}
      onClick={onClick}
      aria-pressed={isActive}
    />
  )
}

export default Pad
