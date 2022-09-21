/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const { sms, ussd, menu } = require('../../config/africastalking');
const Model = require('../../models/ticket.model');

const dataToSave = {};

module.exports = async function helpController(req, res) {
  try {
    menu.state('entry-point-to-help-controller', {
      run: () => {
        const name = menu.val;
        dataToSave.name = name;
        console.log(dataToSave);
        menu.con('This is the help controller');
      },
      next: {
        // using regex to match user input to next state
        '*\\d+': 'end',
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
