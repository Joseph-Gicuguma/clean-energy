/* eslint-disable no-console */
const { sms } = require('../../config/africastalking');

module.exports = async function sendSMS() {
  try {
    const result = await sms.send({
      to: '+254771251753',
      message: 'This chatbot has been initiated',
      from: '23881',
    });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};
