var client_id = '4e2756e28cf54967b753b6f854e27975';
var client_secret = 'd634954917f84318981ec67ace44fe87';

function getAccessToken() {
  fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: 'grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .then(response => response.json())
  .then(data => {
    const accessToken = data.access_token;

    const playlistId = '2r53F197NVkiTlTjSpwkIC'; 
    const playlistId2 = '1gi1UEW95ygwp1Hi9bNNTZ'; 
    const playlistId3 = '0lVCaNuQ9xl3KcPf7Z3CDV'; 


    fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(response => response.json())
    .then(data => {
      // Mettez à jour le contenu de la page HTML avec les informations de la playlist
      const playlistNameElement = document.getElementById('playlist-name');

      // Mettez à jour le nom de la playlist
      playlistNameElement.textContent = data.name;

    })
    .catch(error => {
      console.error('Erreur lors de la récupération des informations de la playlist :', error);
    });

    fetch(`https://api.spotify.com/v1/playlists/${playlistId2}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(response => response.json())
    .then(data => {
      // Mettez à jour le contenu de la page HTML avec les informations de la playlist
      const playlistNameElement = document.getElementById('playlist-name-2');

      // Mettez à jour le nom de la playlist
      playlistNameElement.textContent = data.name;

    })
    .catch(error => {
      console.error('Erreur lors de la récupération des informations de la playlist :', error);
    });
        fetch(`https://api.spotify.com/v1/playlists/${playlistId2}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(response => response.json())
    .then(data => {
      // Mettez à jour le contenu de la page HTML avec les informations de la playlist
      const playlistNameElement = document.getElementById('playlist-name-2');

      // Mettez à jour le nom de la playlist
      playlistNameElement.textContent = data.name;

      
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des informations de la playlist :', error);
    });
    fetch(`https://api.spotify.com/v1/playlists/0lVCaNuQ9xl3KcPf7Z3CDV`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(response => response.json())
    .then(data => {
      // Mettez à jour le contenu de la page HTML avec les informations de la playlist
      const playlistNameElement = document.getElementById('playlist-name-3');

      // Mettez à jour le nom de la playlist
      playlistNameElement.textContent = data.name;

    })
    .catch(error => {
      console.error('Erreur lors de la récupération des informations de la playlist :', error);
    });
  })
  .catch(error => {
    console.error('Erreur lors de la récupération de l\'access token :', error);
  });
  
  
}

// Appelez la fonction pour obtenir l'access token au chargement de la page
getAccessToken();

function loadPlaylistTracks(playlistId) {
  const accessToken = localStorage.getItem('access_token');
  const playlistTracksElement = document.getElementById('playlist-tracks');

  if (accessToken) {
    fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(response => response.json())
    .then(data => {
      data.items.forEach(track => {
        const trackName = track.track.name;
        const artistName = track.track.artists[0].name;
        const trackItem = document.createElement('li');
        trackItem.textContent = `${trackName} - ${artistName}`;
        playlistTracksElement.appendChild(trackItem);
      });
    })
    .catch(error => {
      console.error(`Erreur lors de la récupération des morceaux de la playlist ${playlistId} :`, error);
    });
  } else {
    console.error('L\'access token n\'a pas été trouvé.');
  }
}

// Écoutez l'événement DOMContentLoaded pour exécuter le code au chargement de la page
document.addEventListener('DOMContentLoaded', function () {
  getAccessToken();
});


function loadPlaylistTracks(playlistId) {
  const accessToken = localStorage.getItem('access_token');
  const playlistTracksElement = document.getElementById('playlist-tracks');

  if (accessToken) {
    fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(response => response.json())
    .then(data => {
      // data contient la liste des morceaux de la playlist
      // Ajoutez chaque morceau à la section HTML
      data.items.forEach(track => {
        const trackName = track.track.name;
        const artistName = track.track.artists[0].name;

        // Créez un élément <li> pour chaque morceau et ajoutez-le à la liste
        const trackItem = document.createElement('li');
        trackItem.textContent = `${trackName} - ${artistName}`;
        playlistTracksElement.appendChild(trackItem);
      });
    })
    .catch(error => {
      console.error(`Erreur lors de la récupération des morceaux de la playlist ${playlistId} :`, error);
    });
  } else {
    console.error('L\'access token n\'a pas été trouvé.');
  }
}

const playlistContainer = document.querySelectorAll('.playlist-image');

// Incluez cette fonction pour créer le lecteur Spotify
function createSpotifyPlayer(playlist_uri) {
  const playerContainer = document.getElementById('spotify-player');
  
  if (playerContainer) {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', `https://open.spotify.com/embed/playlist/${playlist_uri}`);
    iframe.setAttribute('width', '300');
    iframe.setAttribute('height', '380');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowtransparency', 'true');
    iframe.setAttribute('allow', 'encrypted-media');
    iframe.setAttribute('class', 'iframe-image');
    iframe.style.position = 'absolute';
    iframe.style.top = '0'
    iframe.style.left = '0'
    iframe.style.width = '100%',
    iframe.style.height = '400vh'
    playerContainer.appendChild(iframe);

    const timesElement = document.createElement('span');

    timesElement.innerHTML = '&#x2190;';
    
    document.body.appendChild(timesElement);
    timesElement.style.position = 'absolute'
    timesElement.style.zIndex = '500000000'
    timesElement.style.fontSize = '150%';
    timesElement.style.color = 'white';
    timesElement.style.left = '3%';
    timesElement.style.top = '3%'
    timesElement.style.cursor = 'pointer';
    timesElement.classList.add('spotify-player-closer')
    
    timesElement.addEventListener('click',()=>{
      iframe.style.display = 'none'
      timesElement.style.display = 'none';
    })
  }
}








// Utilisez la fonction createSpotifyPlayer avec l'URI de votre playlist
// createSpotifyPlayer('1gi1UEW95ygwp1Hi9bNNTZ');
// createSpotifyPlayer('2r53F197NVkiTlTjSpwkIC');

const elements = document.getElementsByClassName("playlist-container");

if (elements.length >= 3) {
  const premierElement = elements[0];
  const deuxiemeElement = elements[1];
    const troisiemeElement = elements[2];

    premierElement.addEventListener('click',() =>{
      createSpotifyPlayer('1gi1UEW95ygwp1Hi9bNNTZ');
    });

    deuxiemeElement.addEventListener('click',() =>{
      createSpotifyPlayer('2r53F197NVkiTlTjSpwkIC ');
    })

  
    troisiemeElement.addEventListener('click',() =>{
      // alert('Hello');
      createSpotifyPlayer('0lVCaNuQ9xl3KcPf7Z3CDV');

    })
    console.log(troisiemeElement);

} else {
    console.log("Il n'y a pas suffisamment d'éléments avec la classe spécifiée.");
}
