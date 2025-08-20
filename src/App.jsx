import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import MainContent from './components/MainContent/MainContent';
import Player from './components/Player/Player';
import Visualizer from './components/Visualizer/Visualizer';
import { playlists } from './data/playlists';
import './styles/AppLayout.css';

function App() {
  // --- Estados ---
  const [activePlaylistId, setActivePlaylistId] = useState(playlists[0].id);
  const [currentSongId, setCurrentSongId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songProgress, setSongProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [likedSongs, setLikedSongs] = useState({});
  const [isVisualizerOpen, setIsVisualizerOpen] = useState(false);
  const [isShuffleActive, setIsShuffleActive] = useState(false);

  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);

  // --- Derivación de Estado ---
  const activePlaylist = playlists.find(p => p.id === activePlaylistId) || playlists[0];
  const currentSong = playlists.flatMap(p => p.songs).find(s => s.id === currentSongId) || null;
  const currentPlaylistOfSong = currentSong ? playlists.find(p => p.songs.some(s => s.id === currentSongId)) : activePlaylist;

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
  const handleSelectPlaylist = (playlistId) => { setActivePlaylistId(playlistId); };

  const handlePlaySong = (song) => {
    if (!audioContextRef.current) { setupAudioContext(); }
    if (audioContextRef.current.state === 'suspended') { audioContextRef.current.resume(); }
    setCurrentSongId(song.id);
    setIsPlaying(true);
  };

  const handleToggleShuffle = () => {
    setIsShuffleActive(prev => !prev);
  };

  const handleNextSong = () => {
    if (!currentPlaylistOfSong || currentSongId === null) return;
    const songs = currentPlaylistOfSong.songs;
    if (isShuffleActive) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * songs.length);
      } while (songs.length > 1 && songs[randomIndex].id === currentSongId);
      setCurrentSongId(songs[randomIndex].id);
    } else {
      const currentSongIndex = songs.findIndex(s => s.id === currentSongId);
      const nextIndex = (currentSongIndex + 1) % songs.length;
      setCurrentSongId(songs[nextIndex].id);
    }
    setIsPlaying(true);
  };

  const handlePrevSong = () => {
    if (!currentPlaylistOfSong || currentSongId === null) return;
    const songs = currentPlaylistOfSong.songs;
    const currentSongIndex = songs.findIndex(s => s.id === currentSongId);
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongId(songs[prevIndex].id);
    setIsPlaying(true);
  };

  const handleTogglePlay = () => { if (currentSong) { setIsPlaying(!isPlaying); } };
  const handleToggleLike = (songId) => { setLikedSongs(prev => { const newLikes = { ...prev }; if (newLikes[songId]) { delete newLikes[songId]; } else { newLikes[songId] = true; } return newLikes; }); };
  const handleSeek = (e) => { if (audioRef.current) { audioRef.current.currentTime = e.target.value; setSongProgress(e.target.value); } };
  const handleVolumeChange = (e) => { setVolume(e.target.value); };
  const handleTimeUpdate = () => { setSongProgress(audioRef.current.currentTime); };

  // --- UseEffects ---
  useEffect(() => { try { const storedLikes = localStorage.getItem('likedSongs'); if (storedLikes) { setLikedSongs(JSON.parse(storedLikes)); } } catch (error) { console.error("Error reading from localStorage", error); } }, []);
  useEffect(() => { try { localStorage.setItem('likedSongs', JSON.stringify(likedSongs)); } catch (error) { console.error("Error writing to localStorage", error); } }, [likedSongs]);
  useEffect(() => { if (audioRef.current) { if (isPlaying) { audioRef.current.play().catch(e => console.error("Error playing audio:", e)); } else { audioRef.current.pause(); } } }, [isPlaying, currentSongId]);
  useEffect(() => { if (audioRef.current) { audioRef.current.volume = volume; } }, [volume]);

  return (
    <div className="app-container">
      <audio ref={audioRef} src={currentSong?.file} onTimeUpdate={handleTimeUpdate} onEnded={handleNextSong} crossOrigin="anonymous" />
      {isVisualizerOpen && <Visualizer analyser={analyserRef.current} onClose={() => setIsVisualizerOpen(false)} />}
      <div className="app-body">
        <Sidebar 
            playlists={playlists}
            activePlaylistId={activePlaylistId}
            onSelectPlaylist={handleSelectPlaylist}
        />
        <MainContent 
            key={activePlaylistId} 
            playlist={activePlaylist}
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
        isShuffleActive={isShuffleActive}
        onTogglePlay={handleTogglePlay}
        onNext={handleNextSong}
        onPrev={handlePrevSong}
        onSeek={handleSeek}
        onToggleShuffle={handleToggleShuffle}
        volume={volume}
        onVolumeChange={handleVolumeChange}
        onVisualizerToggle={() => setIsVisualizerOpen(!isVisualizerOpen)}
      />
    </div>
  );
}

export default App;
