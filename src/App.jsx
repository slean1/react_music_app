import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import MainContent from './components/MainContent/MainContent';
import Player from './components/Player/Player';
import Visualizer from './components/Visualizer/Visualizer';
import { songs } from './data/songs';
import './styles/AppLayout.css';

function App() {
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songProgress, setSongProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [likedSongs, setLikedSongs] = useState({});
  const [isVisualizerOpen, setIsVisualizerOpen] = useState(false);
  
  const audioRef = useRef(null);
  const audioContextRef = useRef(null); // Usar ref para el contexto de audio
  const analyserRef = useRef(null); // Usar ref para el analizador

  const currentSong = currentSongIndex !== null ? songs[currentSongIndex] : null;

  // --- Lógica de Audio --- 
  const setupAudioContext = () => {
    if (!audioContextRef.current) {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      const source = context.createMediaElementSource(audioRef.current);
      const analyser = context.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyser.connect(context.destination);
      audioContextRef.current = context;
      analyserRef.current = analyser;
    }
  };

  // --- Handlers --- 
  const handlePlaySong = (song) => {
    if (!audioContextRef.current) {
      setupAudioContext();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    const songIndex = songs.findIndex(s => s.id === song.id);
    if (songIndex !== -1) {
      setCurrentSongIndex(songIndex);
      setIsPlaying(true);
    }
  };

  // ... (resto de los handlers y useEffects sin cambios) ...
  useEffect(() => {
    try {
      const storedLikes = localStorage.getItem('likedSongs');
      if (storedLikes) { setLikedSongs(JSON.parse(storedLikes)); }
    } catch (error) { console.error("Error reading from localStorage", error); }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
    } catch (error) { console.error("Error writing to localStorage", error); }
  }, [likedSongs]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Error playing audio:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSongIndex]);

  useEffect(() => {
    if (audioRef.current) { audioRef.current.volume = volume; }
  }, [volume]);

  const handleTogglePlay = () => { if (currentSong) { setIsPlaying(!isPlaying); } };
  const handleToggleLike = (songId) => { setLikedSongs(prev => { const newLikes = { ...prev }; if (newLikes[songId]) { delete newLikes[songId]; } else { newLikes[songId] = true; } return newLikes; }); };
  const handleNextSong = () => { if (currentSongIndex === null) return; const nextIndex = (currentSongIndex + 1) % songs.length; setCurrentSongIndex(nextIndex); setIsPlaying(true); };
  const handlePrevSong = () => { if (currentSongIndex === null) return; const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length; setCurrentSongIndex(prevIndex); setIsPlaying(true); };
  const handleSeek = (e) => { if (audioRef.current) { audioRef.current.currentTime = e.target.value; setSongProgress(e.target.value); } };
  const handleVolumeChange = (e) => { setVolume(e.target.value); };
  const handleTimeUpdate = () => { setSongProgress(audioRef.current.currentTime); };

  return (
    <div className="app-container">
      <audio
        ref={audioRef}
        src={currentSong?.file}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNextSong}
        crossOrigin="anonymous"
      />
      {isVisualizerOpen && <Visualizer analyser={analyserRef.current} onClose={() => setIsVisualizerOpen(false)} />}
      <div className="app-body">
        <Sidebar />
        <MainContent 
            songs={songs} 
            onPlaySong={handlePlaySong} 
            currentSong={currentSong} 
            isPlaying={isPlaying} 
            likedSongs={likedSongs}
            onToggleLike={handleToggleLike}
        />
      </div>
      <Player
        song={currentSong}
        isPlaying={isPlaying}
        progress={songProgress}
        duration={audioRef.current?.duration || 0}
        onTogglePlay={handleTogglePlay}
        onNext={handleNextSong}
        onPrev={handlePrevSong}
        onSeek={handleSeek}
        volume={volume}
        onVolumeChange={handleVolumeChange}
        onVisualizerToggle={() => setIsVisualizerOpen(!isVisualizerOpen)}
      />
    </div>
  );
}

export default App;