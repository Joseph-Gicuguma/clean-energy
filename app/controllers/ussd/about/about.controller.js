/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const { sms, ussd, menu } = require('../../../config/africastalking');
const ServicesController = require('../services/services.controller');

module.exports = async function aboutController(req, res) {
  try {
    menu.state('entry-point-to-about-controller', {
      run: () => {
        menu.con(
          'Here you can get more information about the following services we offer'
            + '\n1. See all projects',
        );
      },
      // next object links to next state based on user input
      next: { 1: 'entry-point-to-services-controller' },
    });

    menu.state('entry-point-to-services-controller', {
      run() {
        ServicesController(req, res);
      },
    });

    menu.state('quit', {
      run: () => {
        menu.end('Goodbye :)');
      },
    });
    console.log('result');
    menu.run(req.body, (ussdResult) => {
      res.send(ussdResult);
    });
  } catch (error) {
    console.error(error);
  }
};
