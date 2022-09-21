/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const { sms, ussd, menu } = require('../../config/africastalking');
const RegisterController = require('./register.controller');
const AboutController = require('./about.controller');
const HelpController = require('./help.controller');
const SubscriptionsController = require('./subscriptions.controller');

module.exports = async function AppController(req, res) {
  try {
    menu.startState({
      run: () => {
        // use menu.con() to send response without terminating session
        menu.con('Welcome! Ready to register for the Cool Devs Clean energy:'
              + '\n1. Get started'
              + '\n2. Help!'
              + '\n3. About'
              + '\n4. Subscriptions');
      },
      // next object links to next state based on user input
      next: {
        1: 'entry-point-to-register-controller',
        2: 'entry-point-to-help-controller',
        3: 'entry-point-to-about-controller',
        4: 'entry-point-to-subscriptions-controller',
      },
    });

    menu.state('entry-point-to-register-controller', {
      run() {
        RegisterController(req, res);
      },
    });

    menu.state('entry-point-to-help-controller', {
      run() {
        HelpController(req, res);
      },
    });

    menu.state('entry-point-to-about-controller', {
      run() {
        AboutController(req, res);
      },
    });

    menu.state('entry-point-to-subscriptions-controller', {
      run() {
        SubscriptionsController(req, res);
      },
    });
    menu.run(req.body, (ussdResult) => {
      res.send(ussdResult);
    });
  } catch (error) {
    console.error(error);
  }
};
