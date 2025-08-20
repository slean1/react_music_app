import React from 'react';
import './Player.css';

// Función auxiliar para formatear el tiempo de segundos a MM:SS
const formatTime = (timeInSeconds) => {
  if (isNaN(timeInSeconds) || timeInSeconds === 0) return '00:00';
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

function Player({ song, isPlaying, progress, duration, onTogglePlay, onNext, onPrev, onSeek, volume, onVolumeChange }) {

  if (!song) {
    return (
      <div className='player player-placeholder'>
        <p>Selecciona una canción para reproducir</p>
      </div>
    );
  }

  return (
    <div className='player'>
      <div className='song-info'>
        <p>{song.title}</p>
        <span>{song.artist}</span>
      </div>

      <div className='player-center'>
        <div className='player-controls'>
          <button onClick={onPrev} className='control-button'>⏮</button>
          <button onClick={onTogglePlay} className='play-pause-button'>
            {isPlaying ? '❚❚' : '▶'}
          </button>
          <button onClick={onNext} className='control-button'>⏭</button>
        </div>
        <div className='progress-bar-container'>
          <span>{formatTime(progress)}</span>
          <input
            type="range"
            min="0"
            max={duration}
            value={progress}
            onChange={onSeek}
            className="progress-bar"
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className='volume-controls'>
        <span>🔊</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={onVolumeChange}
          className="volume-slider"
        />
      </div>
    </div>
  );
}

export default Player;