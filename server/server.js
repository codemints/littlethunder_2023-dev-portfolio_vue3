require('dotenv').config();
const express = require('express');
const axios = require('axios');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const app = express();

app.use(cors());

const port = process.env.PORT;
const GOOGLE_MAPS_SECRET = process.env.GOOGLE_MAPS_SECRET;
const GITHUB_SECRET = process.env.GITHUB_SECRET;
const SPOTIFY_ID = process.env.SPOTIFY_ID;
const SPOTIFY_SECRET = process.env.SPOTIFY_SECRET;

const githubBaseURL = process.env.GITHUB_BASE_URL
const playlistID = '1wqRc9CwpjrifbB3AqO4jZ';
const tracksToShow = 3;

const generateRandomString = length => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  
  return Array.from({ length })
    .reduce(text => text + possible.charAt(Math.floor(Math.random() * possible.length)), '')
}

app.get('/map-data', async (req, res) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_SECRET}&v=weekly`;
    const { data } = await axios.get(url);

    res.send(data);
  } catch(err) {
    console.log(err);
    res.status(500).send('An error occurred while fetching the user data');
  }
})

app.get('/callback', async (req, res) => {
  try {
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Authorization': 'Basic ' + (new Buffer.from(SPOTIFY_ID + ':' + SPOTIFY_SECRET).toString('base64'))
      },
      form: {
        grant_type: 'client_credentials'
      },
      json: true
    };

    const { data: { access_token } } = await axios.post(authOptions.url, authOptions.form, { headers: authOptions.headers });

    const options = {
      url: `https://api.spotify.com/v1/playlists/${playlistID}/tracks?limit=${tracksToShow}`,
      headers: {
        'Authorization': 'Bearer ' + access_token
      },
      json: true
    };

    const { data } = await axios.get(options.url, { headers: options.headers });

    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send('An error occurred while fetching the user data');
  }
});

app.listen(8888, () => {
  console.log(`Express app listening on port ${port}`);
});
