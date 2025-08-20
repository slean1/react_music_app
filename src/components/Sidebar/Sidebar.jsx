import React from 'react';
import './Sidebar.css';

function Sidebar({ playlists, activePlaylistId, onSelectPlaylist }) {
  return (
    <div className='sidebar'>
      <div className='playlists'>
        <h3>Playlists</h3>
        <ul>
          {playlists.map(playlist => (
            <li 
              key={playlist.id}
              className={playlist.id === activePlaylistId ? 'active' : ''}
              onClick={() => onSelectPlaylist(playlist.id)}
            >
              {playlist.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
