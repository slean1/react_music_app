import React, { useState, useEffect, useRef } from 'react';
import './Sidebar.css';

function Sidebar({ playlists, activePlaylistId, onSelectPlaylist, onEditPlaylistName, currentSong, isOpen, onClose }) {
  const [editingPlaylistId, setEditingPlaylistId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const sidebarRef = useRef(null);

  // Hook para cerrar el sidebar si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        // Añadimos una comprobación para no cerrar si se hace clic en el botón de menú
        if (!event.target.closest('.menu-button')) {
          onClose();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);


  const handleEditClick = (playlist) => {
    setEditingPlaylistId(playlist.id);
    setEditedName(playlist.name);
  };

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleSaveName = (playlistId) => {
    if (editedName.trim() !== '') {
      onEditPlaylistName(playlistId, editedName.trim());
    }
    setEditingPlaylistId(null);
    setEditedName('');
  };

  const handleKeyDown = (e, playlistId) => {
    if (e.key === 'Enter') {
      handleSaveName(playlistId);
    } else if (e.key === 'Escape') {
      setEditingPlaylistId(null);
      setEditedName('');
    }
  };
  
  const handleSelectAndClose = (playlistId) => {
    onSelectPlaylist(playlistId);
    onClose(); // Cierra el sidebar al seleccionar una playlist en móvil
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : ''}`} ref={sidebarRef}>
        <div className='playlists'>
          <h3>Playlists</h3>
          <ul>
            {playlists.map(playlist => (
              <li 
                key={playlist.id}
                className={`playlist-item ${playlist.id === activePlaylistId ? 'active' : ''}`}
              >
                {editingPlaylistId === playlist.id ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={handleNameChange}
                    onBlur={() => handleSaveName(playlist.id)}
                    onKeyDown={(e) => handleKeyDown(e, playlist.id)}
                    className="playlist-name-input"
                    autoFocus
                  />
                ) : (
                  <>
                    <div className="playlist-info" onClick={() => handleSelectAndClose(playlist.id)}>
                      <span className="playlist-name">{playlist.name}</span>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleEditClick(playlist); }}
                      className="edit-playlist-button control-button"
                      aria-label={`Edit playlist ${playlist.name}`}
                    >
                      ✎
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
        {/* Contenedor de imagen de artista para desktop/tablet */}
        {currentSong && currentSong.artistImage && (
          <div className="artist-image-sidebar-container">
            <img src={currentSong.artistImage} alt={currentSong.artist} />
          </div>
        )}
      </div>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
    </>
  );
}

export default Sidebar;
