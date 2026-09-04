# 🎵 Beat Maker Studio

Web-based beat maker production studio: React + Tone.js, Vite + TypeScript, with CI and GitHub Pages deploy

## Features

- 🎹 **Step Sequencer**: 8 notes × 16 steps with intuitive grid interface
- 🎛️ **Real-time Controls**: 
  - BPM adjustment (60-200)
  - Volume control
  - Play/Pause/Stop controls
- 💾 **Pattern Management**: Save and load beat patterns to browser storage
- 🎨 **Beautiful UI**: Modern gradient design with smooth animations
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- ⚡ **Production Ready**: TypeScript, ESLint, optimized performance

## Technology Stack

- **Frontend**: React 18.2.0 with TypeScript
- **Audio**: Tone.js 14.7.77 (Web Audio API wrapper)
- **Build Tool**: Vite 5.0.0
- **Styling**: CSS3 with gradients and animations
- **Package Manager**: npm

## Quick Start

### Prerequisites
- Node.js 16+ 
- npm 7+

### Installation & Running

```bash
# Clone the repository
git clone https://github.com/superrepus311-ctrl/beat-maker-studio.git
cd beat-maker-studio

# Install dependencies
npm install

# Start development server
npm run dev

# The app will open at http://localhost:5173
```

### Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

## Usage

1. **Initialize Audio**: Click anywhere on the page to initialize the audio engine
2. **Create Beat**: Click on pads in the grid to toggle notes on/off
3. **Adjust BPM**: Use the BPM slider to change tempo (60-200)
4. **Control Volume**: Use the Volume slider to adjust output level
5. **Play Beat**: Click the Play button to start playback
6. **Save Pattern**: Click Save to store your beat pattern
7. **Load Pattern**: Click Load to retrieve saved patterns

## Keyboard Shortcuts

- **Click to Initialize**: First interaction initializes audio
- **Grid Pads**: Click any pad to toggle note on/off
- **Sliders**: Use range inputs for BPM and Volume

## Project Structure

```
src/
  App.tsx                 Main app component with play controls
  App.css                 App styling and layouts
  main.tsx                React entry point
  index.css               Global styles
  components/
    BeatMaker.tsx         Step sequencer component
    BeatMaker.css         Sequencer styling
    Pad.tsx               Individual pad component
    Pad.css               Pad styling and animations
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint checks
- `npm run typecheck` - Run TypeScript type checking
- `npm start` - Alias for `npm run dev`

## Browser Support

- Chrome/Edge (v90+)
- Firefox (v88+)
- Safari (v14+)
- Mobile browsers with Web Audio API support

## Features Implemented

✅ Complete step sequencer with 8 notes × 16 steps  
✅ Real-time playback with Tone.js  
✅ BPM and Volume controls  
✅ Save/Load pattern functionality  
✅ Responsive design for all screen sizes  
✅ Error handling and audio initialization  
✅ Step indicator for playback feedback  
✅ Beautiful UI with animations  
✅ TypeScript type safety  
✅ Production-ready build configuration  

## Known Limitations

- Patterns saved to browser storage (max 5-10MB)
- Single synth instrument (no multiple tracks yet)
- No MIDI support (future enhancement)
- No audio export (WAV/MP3)

## Performance

- Optimized Vite bundle (~200KB gzipped)
- Efficient React re-renders with useCallback
- Hardware-accelerated CSS animations
- Responsive audio scheduling with Web Audio API

## License

MIT - See LICENSE file for details

## Author

Charles Steven Smith ([@superrepus311-ctrl](https://github.com/superrepus311-ctrl))

## Contributing

Contributions welcome! Feel free to submit issues and pull requests.

---

**Made with ❤️ using React + Tone.js**
