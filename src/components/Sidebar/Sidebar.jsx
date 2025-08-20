import React, { useState } from 'react';
import './Sidebar.css';

function Sidebar({ playlists, activePlaylistId, onSelectPlaylist, onEditPlaylistName, currentSong }) {
  const [editingPlaylistId, setEditingPlaylistId] = useState(null);
  const [editedName, setEditedName] = useState('');

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

  return (
    <div className='sidebar'>
      <div className='playlists'>
        <h3>Playlists</h3>
        <ul>
          {playlists.map(playlist => (
            <li 
              key={playlist.id}
              className={playlist.id === activePlaylistId ? 'active' : ''}
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
                <> {/* Use a fragment to group elements */}
                  <div className="playlist-name-container" onClick={() => onSelectPlaylist(playlist.id)}>
                    <span>{playlist.name}</span>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleEditClick(playlist); }}
                    className="edit-playlist-button control-button"
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
  );
}

export default Sidebar;
