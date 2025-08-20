import React from 'react';
import './MainContent.css';

function MainContent({ songs, onPlaySong, currentSong, isPlaying }) {
  return (
    <div className='main-content'>
      <h2>Lista Test</h2>
      <table className='songs-table'>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th className='artist-col'>Artist</th>
            <th className='duration-col'>Duration</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song) => (
            <tr 
              key={song.id} 
              onDoubleClick={() => onPlaySong(song)}
              className={currentSong?.id === song.id ? 'active-song' : ''}
            >
              <td>
                <button onClick={() => onPlaySong(song)} className='play-button'>
                  {currentSong?.id === song.id && isPlaying ? '❚❚' : '▶'}
                </button>
              </td>
              <td>{song.title}</td>
              <td className='artist-col'>{song.artist}</td>
              <td className='duration-col'>{song.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MainContent;