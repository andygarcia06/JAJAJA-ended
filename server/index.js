const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const clientId = '1094001518286393'; // Remplacez par votre client ID
const clientSecret = '4a08720b953b3b58caa0478b45e81657'; // Remplacez par votre client secret
const redirectUri = 'https://jajaja.com/'; // Remplacez par votre redirect URI

// Utilisez le middleware express.static pour servir des fichiers statiques, y compris index.html
app.use(express.static(__dirname));

// Route pour obtenir le long-lived token
app.get('/getLongLivedToken', (req, res) => {
  // URL de l'API Instagram pour obtenir le long-lived token
  const apiUrl = `https://graph.instagram.com/v12.0/access_token`;

  // Paramètres de la requête POST
  const postData = {
    grant_type: 'ig_exchange_token',
    client_id: clientId,
    client_secret: clientSecret,
    fb_exchange_token: 'IGQWRQUnJmLVZAST1NWT2lQcUgweFY2UFY5TjRERlV3RnJYek5HUE1pUDZAuNUFkR3pVRlFJSkd0QWhxb2FoTUtvZAlZAfWlhUaF9vVlBTYnVzelhjdkZANUGZAaWE5mQzc1S2o4MUNtNFR1Nk5qbVFfQmJwU0tJeF9ON1EZD', // Remplacez par votre short-lived token
  };

  // Effectuez la requête POST pour obtenir le long-lived token
  axios
    .post(apiUrl, null, { params: postData })
    .then((response) => {
      const longLivedToken = response.data.access_token;
      res.json({ longLivedToken }); // Envoyez le long-lived token en réponse JSON
    })
    .catch((error) => {
      console.error('Erreur lors de l\'obtention du Long-Lived Token:', error.message);
      res.status(500).json({ error: 'Erreur lors de l\'obtention du Long-Lived Token' });
    });
});

app.get('/', (req, res) => {
  // Envoyez la page HTML au client
  res.sendFile(__dirname + '/index.html');
});

app.get('/getProfileInfo', (req, res) => {
  // Récupérer le long-lived token du query parameter ou d'une autre source
  const longLivedToken = req.query.longLivedToken;

  // Vérifier si le token est fourni
  if (!longLivedToken) {
      return res.status(400).json({ error: 'Long-lived token manquant' });
  }

  const profileInfoUrl = `https://graph.instagram.com/me?fields=id,username,account_type,media_count,profile_picture_url&access_token=${longLivedToken}`;

  axios.get(profileInfoUrl)
  .then(response => {
      const profileInfo = response.data;
      res.json(profileInfo);
  })
  .catch(error => {
      console.error('Erreur lors de la récupération des informations du profil:', error.message);
      res.status(500).json({ error: 'Erreur lors de la récupération des informations du profil' });
  });
});


app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
