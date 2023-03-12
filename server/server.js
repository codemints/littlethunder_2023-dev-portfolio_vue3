require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const graphqlHTTP = require('express-graphql');
const { createClient } = require('@supabase/supabase-js');
const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8888;
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_APP_PASS = process.env.EMAIL_APP_PASS;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const parseDate = (date) => {
  const dateStr = new Date(date);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short'
  };
  return dateStr.toLocaleString('en-US', options)
  
}

const notifyEmail = async (columns) => {
  const data = columns[0]
  const sentOn = parseDate(data.created_at);
  const {
    name,
    company,
    email,
    phone,
    website,
    concern,
    description,
    message
  } = data;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_APP_PASS
    }
  });

  const mailOptions = {
    from: EMAIL_USER,
    to: EMAIL_USER,
    subject: 'New Form Submission',
    html: `
      <h1>New Form Submission</h1>
      <h3>${sentOn}</h3>
      <h4>${name}</h4>
      <p>${company || 'No company name submitted'}</p>
      <p>${email}</p>
      <p>${phone}</p>
      <p>${website || 'No website submitted'}</p>
      <p>${concern || 'No concern submitted'}</p>
      <p>${description || 'No description submitted'}</p>
      <p>${message || 'No message submitted'}</p>
      `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

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


//FORMKIT API
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

    if (error) {
      console.log(error);
      res.status(500).send('There was an error submitting the form.');
    }

    if ( data ) {
      res.send(data);
      notifyEmail(data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('There was an error submitting the form.');
  }
})

//RECAPTCHA API
app.post('/api/recaptcha', async (req, res) => {
  const { token } = req.body;
  const secret = RECAPTCHA_SECRET_KEY;
  const remoteip = req.socket.remoteAddress;
  const threshold = 0.5;
  
  if (!token) {
    res.status(400).send('Missing required payload.');
    return
  }

  const url = 'https://www.google.com/recaptcha/api/siteverify';
  const params = new URLSearchParams({
    secret,
    response: token,
    remoteip
  })

  await axios.post(url, params)
  .then(response => {
    const { score, success } = response.data;
    if ( score >= threshold && success ) {
      res.send(response.data);
    } else {
      res.status(400).send('reCAPTCHA verification failed.');
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).send('Error verifying recaptcha token.');
  })
})

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}`);
});
