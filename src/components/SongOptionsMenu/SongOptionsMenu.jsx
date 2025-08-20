import React from 'react';
import './SongOptionsMenu.css';

function SongOptionsMenu({ song, onClose }) {
  const handleShare = () => {
    const message = `¡Estoy escuchando ${song.title} de ${song.artist}!`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const handleKnowMore = () => {
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(song.artist)}`;
    window.open(googleUrl, '_blank');
    onClose();
  };

  return (
    <div className="song-options-menu">
      <ul>
        <li onClick={handleShare}>Compartir</li>
        <li onClick={handleKnowMore}>Saber más</li>
      </ul>
    </div>
  );
}

export default SongOptionsMenu;
