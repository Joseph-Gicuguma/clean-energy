/* eslint-disable no-console */
// .env file configurations
require('dotenv/config');

// importing required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// database configurations
require('./config/database')(mongoose);

// send sms server
const chatbotSMS = require('./controllers/sms/chatbot.controller');

// importing routes form .routes
const { AppRoutes } = require('./routes');

// initializing the app
const app = express();

//  required middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Default server port
app.get('/', (req, res) => {
  res.send('Your server is running');
});

// routes
app.use('/', AppRoutes);

// listen for incoming messages
// after running the server, set ngrok callback url with this route
app.post('/incoming-messages', (req, res) => {
  const data = req.body;
  console.log('Received message', data);
  console.log('Here is the body of the text:', data.text);
  chatbotSMS();
  // this response is required by Africa's Talking
  res.sendStatus(200);
});

// define the port
const port = parseInt(process.env.PORT, 10) || 3000;

// port listening
app.listen(port, () => {
  try {
    console.log(`Server is running on port: ${port}`);
  } catch (error) {
    console.error(error);
  }
});
