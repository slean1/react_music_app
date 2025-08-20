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
        duration: '4:46',
        artistImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Alice_In_Chains.jpg/800px-Alice_In_Chains.jpg'
      },
      {
        id: 2,
        title: 'Windowpane',
        artist: 'Opeth',
        file: '/music/opeth_windowpane.mp3',
        duration: '7:45',
        artistImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Opeth_%40_Apolo_01.jpg/800px-Opeth_%40_Apolo_01.jpg'
      },
      {
        id: 3,
        title: 'Anesthetize',
        artist: 'Porcupine Tree',
        file: '/music/porcupinetree_anesthetize.mp3',
        duration: '17:42',
        artistImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Porcupine_Tree_%40_Poznan%2C_Poland_2007_04.jpg/1024px-Porcupine_Tree_%40_Poznan%2C_Poland_2007_04.jpg'
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
        duration: '4:02',
        artistImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Bad_Bunny_2019_by_Glenn_Francis_%28cropped%29.jpg/800px-Bad_Bunny_2019_by_Glenn_Francis_%28cropped%29.jpg'
      },
      {
        id: 5,
        title: 'Atrévete-Te-Te',
        artist: 'Calle 13',
        file: '/music/Calle13_Atrevetetete.mp3',
        duration: '4:00',
        artistImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Calle_13_en_Venezuela.jpg/800px-Calle_13_en_Venezuela.jpg'
      },
      {
        id: 6,
        title: 'Virtual Diva',
        artist: 'Don Omar',
        file: '/music/donomar_virtualdiva.mp3',
        duration: '4:02',
        artistImage: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Don_Omar_-_The_Kingdom_%28Official_Q_%26_A%29.png'
      }
    ]
  }
];