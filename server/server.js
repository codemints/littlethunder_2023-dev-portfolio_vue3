require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const { createClient } = require('@supabase/supabase-js');
const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT;
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

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
app.post('/api/form_submission', async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400).send('Missing required payload.');
    return
  }
  
  try {
    const { data, error } = await supabase
    .from('form_submissions')
    .insert([req.body])
    .select();

    console.log(data, error)

    if (error) {
      console.log(error);
      res.status(500).send('There was an error submitting the form.');
    }

    if ( data ) {
      res.send(data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('There was an error submitting the form.');
  }
})

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}`);
});
