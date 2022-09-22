/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const { sms, ussd, menu } = require('../../../config/africastalking');
const Model = require('../../../models/user.model');

const dataToSave = {};

module.exports = async function aboutController(req, res) {
  try {
    menu.state('entry-point-to-about-controller', {
      run: () => {
        menu.con('Here you can get more information about the following services we offer'
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

    menu.state('end', {
      run: async () => {
        const tickets = menu.val;
        dataToSave.tickets = tickets;
        console.log(dataToSave);

        // Save the data

        const data = new Model({
          name: dataToSave.name,
          tickets: dataToSave.tickets,
        });

        const dataSaved = await data.save();
        console.log(dataSaved);
        const options = {
          to: menu.args.phoneNumber,
          message: `Hi ${dataToSave.name}, we've reserved ${dataToSave.tickets} tickets for you.`,
        };
        await sms.send(options);

        menu.end(`Awesome! We have reserverd ${dataToSave.tickets} tickets for you mkubwa We have your tickets reserved. Sending a confirmation text shortly.`);
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
