/* eslint-disable max-len */
/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const { sms, ussd, menu } = require('../../config/africastalking');
const UserModel = require('../../models/user.model');

const dataToSave = {};

module.exports = async function registerController(req, res) {
  try {
    // menu.state('login-to-account', {
    //   run: () => {
    //     menu.con('Are you a new member? Is this your first time here, please register, if not, please login to continue'
    //           + '\n1. Register'
    //           + '\n2. Login');
    //   },
    //   next: {
    //     1: 'new-account',
    //     2: 'login',
    //   },
    // });

    menu.state('login-to-account', {
      run: async () => {
        menu.con('Please enter your email. If it is valid, you will receive a confirmation text from us shortly.');
      },
      next: {
        '*[a-zA-Z]+': 'confirm-email-verification',
      },
    });

    menu.state('confirm-email-verification', {
      run: async () => {
        const name = menu.val;
        dataToSave.name = name;
        console.log('dataToSave', dataToSave);
        menu.con(`Alright ${dataToSave.name}, Your email is confirmed. `);
      },
      next: {
        '*[a-zA-Z]+': 'finish-registration',
      },
    });

    menu.state('confirm-email-verification-fail', {
      run: async () => {
        const name = menu.val;
        dataToSave.name = name;
        console.log('dataToSave', dataToSave);
        menu.con('Sorry, the code you entered is incorrect. Please try again.'
        + '\n1. Quit'
        + '\n2. Try again');
      },
      next: {
        0: 'quit',
        1: 'login-to-account',
      },
    });

    menu.state('finish-registration', {
      run: async () => {
        const email = menu.val;
        dataToSave.email = email;
        console.log('dataToSave last at registerEmail', dataToSave);

        // Save the data
        const data = new UserModel({
          name: dataToSave.name,
          email: dataToSave.email,
        });

        const dataSaved = await data.save();
        console.log('dataSaved', dataSaved);

        menu.end('You will receive a confirmation text from us shortly. Thank you for registering with us.');
      },
    });

    menu.state('quit', {
      run: async () => {
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
