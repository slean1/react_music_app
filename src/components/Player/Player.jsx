import React, { useState } from 'react';
import './Player.css';

const formatTime = (timeInSeconds) => {
  if (isNaN(timeInSeconds) || timeInSeconds === 0) return '00:00';
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

function Player({ song, isPlaying, progress, duration, onTogglePlay, onNext, onPrev, onSeek, volume, onVolumeChange, onVisualizerToggle }) {
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);

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
        <button onClick={onVisualizerToggle} className='visualizer-toggle'>
            <img src="https://media1.tenor.com/m/0XfcV8kdzxUAAAAd/sinewave-wave.gif" alt="Visualizer" />
        </button>
        <div className='song-details'>
            <p>{song.title}</p>
            <span>{song.artist}</span>
        </div>
      </div>

      <div className='player-center'>
        <div className='player-controls'>
          <button onClick={onPrev} className='control-button'>⏮</button>
          <button onClick={onTogglePlay} className='play-pause-button'>
            {isPlaying ? '❚❚' : '▶'}
          </button>
          <button onClick={onNext} className='control-button'>⏭</button>

          {/* Controles de volumen movidos aquí para mejor responsividad */}
          <div className='volume-controls-wrapper'>
            <button onClick={() => setIsVolumeVisible(!isVolumeVisible)} className='volume-button'>
              🔊
            </button>
            <div className={`volume-slider-container ${isVolumeVisible ? 'visible' : ''}`}>
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

      {/* El div de la derecha ahora puede estar vacío o usarse para otra cosa */}
      <div className="player-right"></div>
    </div>
  );
}

export default Player;
