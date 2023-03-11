require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const app = express();

app.use(cors());

const PORT = process.env.PORT;
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

app.get('/api/google_map', (req, res) => {
  const params = new URLSearchParams({
    key: GOOGLE_MAPS_API_KEY,
    version: 'weekly',
    callback: 'initMap',
  });

  const url = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;

  axios.get(url)
  .then(response => {
    res.send(response.data);
  })
  .catch(error => {
    console.log(error);
    res.status(500).send('There was an error loading the Google Maps API.');
  })
})

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}`);
});
