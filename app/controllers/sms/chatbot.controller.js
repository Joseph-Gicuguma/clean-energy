/* eslint-disable no-console */
const { sms } = require('../../config/africastalking');

// eslint-disable-next-line no-unused-vars
module.exports = async function sendSMS(req, res) {
  // create a new express session
  try {
    const { text } = req.body;
    if (text === 'wahome') {
      const result = await sms.send({
        to: '+254771251753',
        message: `Text read is ${text}`,
        from: '23881',
      });
      console.log(result);
    } else {
      console.log('no wahome text');
      const result = await sms.send({
        to: '+254771251753',
        message: `Text read is ${text}`,
        from: '23881',
      });
      console.log(result);
    }
  } catch (error) {
    console.error(error);
  }
};
