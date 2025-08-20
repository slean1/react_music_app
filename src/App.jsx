import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import MainContent from './components/MainContent/MainContent';
import Player from './components/Player/Player';
import './styles/AppLayout.css'; // Un archivo de estilos dedicado para el layout

function App() {
  return (
    <div className="app-container">
      <div className="app-body">
        <Sidebar />
        <MainContent />
      </div>
      <Player />
    </div>
  );
}

export default App;