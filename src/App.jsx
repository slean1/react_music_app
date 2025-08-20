import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import MainContent from './components/MainContent/MainContent';
import Player from './components/Player/Player';
import { songs } from './data/songs';
import './styles/AppLayout.css';

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
        if (isPlaying) {
            audioRef.current.play().catch(e => console.error("Error playing audio:", e));
        } else {
            audioRef.current.pause();
        }
    }
  }, [isPlaying, currentSong]);

  const handlePlaySong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    if (currentSong) {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="app-container">
      <audio ref={audioRef} src={currentSong?.file} />
      <div className="app-body">
        <Sidebar />
        <MainContent songs={songs} onPlaySong={handlePlaySong} currentSong={currentSong} isPlaying={isPlaying} />
      </div>
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
      />
    </div>
  );
}

export default App;