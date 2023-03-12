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


//HELLO WORLD
const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
    <title>Hello from Codemints</title>
    <style>
      body, html {
        background-color: #333333;
        overflow: hidden;
        padding: 0;
        margin: 0;
      }
      
      body {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: white;
        min-height: 100vh;
        min-width: 100vw;
      }

      body * {
        box-sizing: border-box;
      }

      div {
        text-align: center;
        padding: 0;
        margin: 0;
      }

      h1, p {
        font-family: 'Montserrat', sans-serif;
      }
      h1 {
        font-size: 60px;
        font-weight: 800;
        text-transform: uppercase;
      }
      p {
        font-size: 20px;
        font-weight: 400;
      }
    </style>
  </head>
  <body>
    <div>
      <h1>Hello World</h1>
      <p>Your server is up and running!</p>
    </div>
    </body>
</html>
`
app.get('/', (req, res) => {
  res.type('html').send(html);
})

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
  const { name, email, phone, company, message, concern, description, website } = req.body;

  if (!name || !email || !phone) {
    res.status(400).send('Missing required payload.');
    return
  }

  try {
    const { data, error } = await supabase
    .from('form_submissions')
    .insert([name, email, phone, company, message, concern, description, website])
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
