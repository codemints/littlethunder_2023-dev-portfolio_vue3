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

app.get('/api/maps_api_key', (req, res) => {
  const apiKey = GOOGLE_MAPS_SECRET;
  res.send(apiKey);
})

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`);
});
