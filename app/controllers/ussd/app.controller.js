/* eslint-disable no-console */
// const UssdMenu = require('ussd-builder');
const {
  // eslint-disable-next-line no-unused-vars
  sms, ussd, menu, DefaultSessions,
} = require('../../config/africastalking');
const RegisterController = require('./auth/register.controller');
const AboutController = require('./about/about.controller');
const HelpController = require('./help/help.controller');
const SubscriptionsController = require('./subscription/subscriptions.controller');
const ManualController = require('./manual/manual.controller');

module.exports = async function AppController(req, res) {
  try {
    menu.startState({
      run: () => {
        console.log('Starting app');
        // DefaultSessions.set('firstName', 'wahome innocent');
        const { sessionId } = menu.args;
        console.log('session id', sessionId);
        // use menu.con() to send response without terminating session
        menu.con('Welcome! Ready to register for the Cool Devs Clean energy:'
              + '\n1. Get started'
              + '\n2. Projects in your area'
              + '\n3. Contact'
              + '\n4. Manual/Guide'
              + '\n5. Subscriptions');
      },
      // next object links to next state based on user input
      next: {
        1: 'entry-point-to-register-controller',
        2: 'entry-point-to-projects-controller',
        3: 'entry-point-to-contact-controller',
        4: 'entry-point-to-manual-controller',
        5: 'entry-point-to-subscriptions-controller',
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

    menu.state('entry-point-to-manual-controller', {
      run() {
        ManualController(req, res);
      },
    });

    menu.run(req.body, (ussdResult) => {
      res.send(ussdResult);
    });
  } catch (error) {
    console.error(error);
  }
};