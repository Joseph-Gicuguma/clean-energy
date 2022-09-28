/* eslint-disable no-console */
const {
  // eslint-disable-next-line no-unused-vars
  sms,
  // eslint-disable-next-line no-unused-vars
  ussd,
  menu,
} = require('../../config/africastalking');
const RegisterController = require('./auth/register.controller');
const ContactController = require('./contact/contact.controller');
const SubscriptionsController = require('./subscription/subscriptions.controller');
const ManualController = require('./manual/manual.controller');
const ProjectsController = require('./projects/projects.controller');

module.exports = async function AppController(req, res) {
  try {
    menu.startState({
      run: () => {
        console.log('Starting app');
        const { sessionId } = menu.args;
        console.log('session id', sessionId);
        // use menu.con() to send response without terminating session
        menu.con(
          'Welcome to Maximoff energy solutions:'
            + '\n1. Get started'
            + '\n2. Projects in your area'
            + '\n3. My Subscriptions'
            + '\n4. Contact us'
            + '\n5. Maximoff Manual',
        );
      },
      // next object links to next state based on user input
      next: {
        1: 'entry-point-to-register-controller',
        2: 'entry-point-to-projects-controller',
        3: 'entry-point-to-subscriptions-controller',
        4: 'entry-point-to-contact-controller',
        5: 'entry-point-to-manual-controller',
      },
    });

    menu.state('entry-point-to-register-controller', {
      run() {
        RegisterController(req, res);
      },
    });
    menu.state('entry-point-to-projects-controller', {
      run() {
        ProjectsController(req, res);
      },
    });

    menu.state('entry-point-to-subscriptions-controller', {
      run() {
        SubscriptionsController(req, res);
      },
    });

    menu.state('entry-point-to-contact-controller', {
      run() {
        ContactController(req, res);
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
