import React from 'react';
import './Sidebar.css';

// Componente de la barra lateral para navegación
function Sidebar() {
  return (
    <div className='sidebar'>
      {/* Las opciones de navegación irían aquí */}
      <div className='playlists'>
        <h3>Playlists</h3>
        <ul>
          {/* Esto eventualmente será dinámico */}
          <li className='active'>Lista Test</li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;