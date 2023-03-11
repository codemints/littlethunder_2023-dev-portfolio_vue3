require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const { createClient } = require('@supabase/supabase-js');
const app = express();

app.use(cors());

const PORT = process.env.PORT;
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

//GOOGLE MAPS API
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


//SUPABASE API
app.get('/api/supabase_client', (req, res) => {
  const seenObjects = new Set();
  const jsonString = JSON.stringify(supabase, function(key, value) {
    if (typeof value === 'object' && value !== null) {
      if (seenObjects.has(value)) {
        return undefined;
      }
      seenObjects.add(value);
    }
    return value;
  });

  res.send(jsonString);
})

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}`);
});
