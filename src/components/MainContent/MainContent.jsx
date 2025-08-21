import React, { useState, useEffect, useRef } from 'react';
import SongOptionsMenu from '../SongOptionsMenu/SongOptionsMenu';
import './MainContent.css';

function MainContent({ playlist, onPlaySong, currentSong, isPlaying, likedSongs, onToggleLike, onToggleSidebar }) {
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openMenuId !== null && menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenuId]);

  const handleMenuToggle = (songId) => {
    setOpenMenuId(prevId => (prevId === songId ? null : songId));
  };

  return (
    <div className='main-content'>
      <div className="main-content-header">
        <button className="menu-button" onClick={onToggleSidebar}>
          ☰
        </button>
        <h2>{playlist.name}</h2>
      </div>
      <table className='songs-table'>
        <thead>
          <tr>
            <th className='play-col'>#</th>
            <th>Title</th>
            <th className='artist-col'>Artist</th>
            <th className='duration-col'>Duration</th>
            <th className='like-col'></th>
            <th className='menu-col'></th>
          </tr>
        </thead>
        <tbody>
          {playlist.songs.map((song) => (
            <tr
              key={song.id}
              onDoubleClick={() => onPlaySong(song)}
              className={currentSong?.id === song.id ? 'active-song' : ''}
            >
              <td className='play-col'>
                <button onClick={() => onPlaySong(song)} className='play-button'>
                  {currentSong?.id === song.id && isPlaying ? '❚❚' : '▶'}
                </button>
              </td>
              <td>{song.title}</td>
              <td className='artist-col'>{song.artist}</td>
              <td className='duration-col'>{song.duration}</td>
              <td className='like-col'>
                <button onClick={() => onToggleLike(song.id)} className={`like-button ${likedSongs[song.id] ? 'liked' : ''}`}>
                  ♥
                </button>
              </td>
              <td className='menu-col'>
                <div className='options-menu-container' ref={openMenuId === song.id ? menuRef : null}>
                  <button onClick={() => handleMenuToggle(song.id)} className='options-button'>
                    ⋮
                  </button>
                  {openMenuId === song.id && (
                    <SongOptionsMenu song={song} onClose={() => setOpenMenuId(null)} />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Contenedor de imagen de artista para móvil */}
      {currentSong && currentSong.artistImage && (
        <div className="artist-image-mobile-container">
          <img src={currentSong.artistImage} alt={currentSong.artist} />
        </div>
      )}
    </div>
  );
}

export default MainContent;
