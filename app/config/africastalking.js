const credentials = {
  apiKey: process.env.AT_SANDBOX_API_KEY,
  username: process.env.AT_SANDBOX_USERNAME,
};

const Africastalking = require('africastalking')(credentials);

const sms = Africastalking.SMS;

const UssdMenu = require('ussd-builder');

const menu = new UssdMenu();

module.exports = { sms, menu };
