import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import MainContent from './components/MainContent/MainContent';
import Player from './components/Player/Player';
import { songs } from './data/songs';
import './styles/AppLayout.css';

function App() {
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songProgress, setSongProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);

  const audioRef = useRef(null);
  const currentSong = currentSongIndex !== null ? songs[currentSongIndex] : null;

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
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handlePlaySong = (song) => {
    const songIndex = songs.findIndex(s => s.id === song.id);
    if (songIndex !== -1) {
      setCurrentSongIndex(songIndex);
      setIsPlaying(true);
    }
  };

  const handleTogglePlay = () => {
    if (currentSong) {
      setIsPlaying(!isPlaying);
    }
  };

  const handleNextSong = () => {
    if (currentSongIndex === null) return;
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    setIsPlaying(true);
  };

  const handlePrevSong = () => {
    if (currentSongIndex === null) return;
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevIndex);
    setIsPlaying(true);
  };

  const handleSeek = (e) => {
    if (audioRef.current) {
      audioRef.current.currentTime = e.target.value;
      setSongProgress(e.target.value);
    }
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  const handleTimeUpdate = () => {
    setSongProgress(audioRef.current.currentTime);
  };

  return (
    <div className="app-container">
      <audio
        ref={audioRef}
        src={currentSong?.file}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNextSong}
      />
      <div className="app-body">
        <Sidebar />
        <MainContent songs={songs} onPlaySong={handlePlaySong} currentSong={currentSong} isPlaying={isPlaying} />
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
      />
    </div>
  );
}

export default App;
