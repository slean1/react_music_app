import React from 'react';
import './Player.css';

function Player({ currentSong, isPlaying, onTogglePlay }) {

  if (!currentSong) {
    return (
      <div className='player'>
        <p>Selecciona una canción para reproducir</p>
      </div>
    );
  }

  return (
    <div className='player'>
      <div className='song-info'>
        <p>{currentSong.title}</p>
        <span>{currentSong.artist}</span>
      </div>
      <div className='player-controls'>
        <button onClick={onTogglePlay}>
          {isPlaying ? '❚❚' : '▶'}
        </button>
      </div>
    </div>
  );
}

export default Player;
