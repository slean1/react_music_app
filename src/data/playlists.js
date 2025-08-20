// data/playlists.js
// Estructura de datos para manejar múltiples playlists

export const playlists = [
  {
    id: 'pl1',
    name: 'Lista Test',
    songs: [
      {
        id: 1,
        title: 'Man in the Box',
        artist: 'Alice in Chains',
        file: '/music/aliceinchains_maninthebox.mp3',
        duration: '4:46'
      },
      {
        id: 2,
        title: 'Windowpane',
        artist: 'Opeth',
        file: '/music/opeth_windowpane.mp3',
        duration: '7:45'
      },
      {
        id: 3,
        title: 'Anesthetize',
        artist: 'Porcupine Tree',
        file: '/music/porcupinetree_anesthetize.mp3',
        duration: '17:42'
      }
    ]
  },
  {
    id: 'pl2',
    name: 'Lista Test 2',
    songs: [
      {
        id: 4,
        title: 'NUEVA YOL',
        artist: 'Bad Bunny',
        file: '/music/badbunny_nuevayol.mp3',
        duration: '1:57'
      },
      {
        id: 5,
        title: 'Atrévete-Te-Te',
        artist: 'Calle 13',
        file: '/music/Calle13_Atrevetetete.mp3',
        duration: '4:00'
      },
      {
        id: 6,
        title: 'Virtual Diva',
        artist: 'Don Omar',
        file: '/music/donomar_virtualdiva.mp3',
        duration: '4:02'
      }
    ]
  }
];
