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

const sessions = {};
module.exports = async function AppController(req, res) {
  try {
    const DefaultSession = menu.sessionConfig({
      start(sessionId, callback) {
        // initialize current session if it doesn't exist
        // this is called by menu.run()
        if (!(sessionId in sessions)) sessions[sessionId] = {};
        callback();
      },
      end(sessionId, callback) {
        // clear current session
        // this is called by menu.end()
        delete sessions[sessionId];
        callback();
      },
      set(sessionId, key, value, callback) {
        // store key-value pair in current session
        sessions[sessionId][key] = value;
        callback();
      },
      get(sessionId, key) {
        return new Promise((resolve) => {
          const value = sessions[sessionId][key];
          resolve(value);
        });
      },
    });
    menu.startState({
      run: () => {
        console.log('Starting app');
        // DefaultSessions.set('firstName', 'wahome innocent');
        const { sessionId } = menu.args;
        console.log('session id', sessionId);
        // UssdMenu.UssdSessionConfig.start(sessionId, () => {
        //   console.log('session started');
        // });
        // UssdMenu.UssdSessionConfig.set('firstName', 'wahome innocent');
        // start the session
        DefaultSession.start(sessionId, () => {
          console.log('session started');
        });
        // set a variable called firstName to the state
        DefaultSession.set(sessionId, 'firstName', 'wahome innocent', () => {
          console.log('session set');
        });
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
