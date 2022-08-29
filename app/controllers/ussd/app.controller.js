// eslint-disable-next-line no-unused-vars
const data = require('../../data/app.json');

module.exports = {
  index: async (req, res) => {
    try {
      const {
        // sessionId,
        // serviceCode,
        phoneNumber,
        text,
      } = req.body;

      let response = '';

      if (text === '') {
        /*
         * This is the main menu
         */
        response = `CON What would you like to check
      0. EMERGENCY
      1. Join Uwezo
      2. Consultation
      3. Find the nearest health facility
      4. Mental health information
      5. Subscriptions
      `;
      } else if (text === '0' || text === 'emergency') {
        /*
         *  0. EMERGENCY
         */
        response = `CON  ${data.emergency.response}
      1. ${data.emergency.one}`;
      } else if (text === '0*1') {
        /*
         *  1. EMERGENCY
         */
        response = 'END You will receive a call shortly or call our emergency hotline on 0800-123-4567';
      } else if (text === '1' || text === 'about') {
        /*
         *  1. EMERGENCY
         */
        response = `CON 1. About Uwezo
        2. Join Uwezo plan`;
      } else if (text === '1*1') {
        response = 'END Uwezo is a mobile health platform that helps you manage your health and wellbeing. We use easily accessible means to deliver health care which is an integral part of humanity';
      } else if (text === '1*2') {
        response = `CON Welcome to Uwezo, we are glad to serve you. Do you want to register using
        1. National ID
        2. Passport`;
      } else if (text === '1*2*1' || text === 'register') {
        response = 'CON Enter your National ID number';
      } else if (text === 'register*123456789' || text === '1*2*1*123456789') {
        response = `END We are creating your account. Your username your login password is ${phoneNumber}`;
      } else if (text === '1*2*2' || text === 'passport') {
        response = 'CON Enter your Passport number';
      } else if (text === 'passport*987654321' || text === '1*2*2*987654321') {
        response = `END We are creating your account. Your login password is ${phoneNumber}`;
      } else if (text === '2') {
        /*
         *  2. CONSULTATION
         */
        response = `CON Recommendations for symptoms
        1.COVID-19
        2.Common cold
        3.Coughing
        `;
      } else if (text === '2*1') {
        response = `END Here are some things you can do
         1. Quarantine
         2. Seek medical advise
         3. Follow COVID19 protocols`;
      } else if (text === '2*2') {
        response = `END Here are some recommendations for you
          1. Drink hot water
          2. Wear warm clothes
          3. Take a hot bath`;
      } else if (text === '2*3') {
        response = `END Here are some recommendations for you
         1. Wear warm clothes
         2. Take a hot bath
         3. Drink hot water`;
      } else if (text === '3') {
        /*
         * 3. FIND NEAREST HEALTH FACILITY
         */
        response = `CON The Nearest Health Facility is
        1.Nairobi
        2.Machakos
        3.Mombasa
        4.Nakuru
        5.Nyeri
        `;
      } else if (text === '3*1') {
        response = `CON 1.Kenyatta University Teaching and Refferal Hospital
        2.Kenyatta National Hospital
        3.Guru Nanak Hospital
        `;
      } else if (text === '3*1*1') {
        response = `CON 1.Book Appointment
        `;
      } else if (text === '3*1*1*1') {
        response = `CON Choose Specialist
        1.Pediatrician
        2.Cardiologist
        3.Phsychiatrist
        `;
      } else if (text === '3*1*1*1*1') {
        response = `CON 25/8/2022 Please Select Time
        1.8am - 12pm
        2.2pm - 5pm
        `;
      } else if (text === '3*1*1*1*1*1') {
        response = `END Appointment Set for 25/8/2022 8am - 12pm with Pediatrician
        `;
      } else if (text === '4') {
        /*
         *  4. MENTAL HEALTH
         */
        response = `CON 1. Get Diagnosis based on symptoms
        2. Talk to an expert
        `;
      } else if (text === '4*1') {
        response = `CON 1. Feeling Tired
        2. Feeling Uneasy`;
      } else if (text === '4*1*1') {
        response = 'END You might be suffering from depressed';
      } else if (text === '4*1*2') {
        response = 'END You might be suffering from anxious';
      } else if (text === '4*2') {
        response = `CON Here are available dates...
        1. 12th
        2. 14th`;
      } else if (text === '4*2*1') {
        response = "END (12th) You have an appointment at Nairobi hospital with doctor Wahosh at 12 o'clock";
      } else if (text === '4*2*2') {
        response = "END (14th) You have an appointment at Kenyatta hospital with doctor Washosh at 12 o'clock";
      } else if (text === '5') {
        /*
         *  5. SUBSCRIPTIONS
         */
        response = `CON Subscribe to get more information
        1. Get regular updates on important health matters
        2. Reminders for appointments and medication
        3. Manage subscriptions
        4. Cancel all subscriptions
        `;
      } else if (text === '5*1') {
        response = `CON What updates would you like to subscribe to
        1. Vaccinations and health workshops
        2. Health newsletters
        `;
      } else if (text === '5*1*1') {
        response = `CON Would you like to subscribe to Vaccinations and health workshops?
        1. Confirm subscription to Vaccinations and health workshops
        `;
      } else if (text === '5*1*1*1') {
        response = `END You have successfully subscribed to information
        on Vaccinations and health workshops
        `;
      } else if (text === '5*1*2') {
        response = `CON Would you like to subscribe to Vaccinations and health workshops?
        1. Confirm subscription to health newsletters
        `;
      } else if (text === '5*1*2*1') {
        response = `END You have successfully subscribed to information
        on Health newsletters
        `;
      } else if (text === '5*2' || text === 'reminders') {
        response = `CON Here is a list of all appointments you currently have. Kindly select the one you want a reminder of
        1. Appointment at Kenyatta University Teaching and Referral Hospital
        `;
      } else if (text === '5*2*1') {
        response = `END You will be reminded of your appointment at Kenyatta University Teaching and Referral Hospital via text
        `;
      } else if (text === '5*3' || text === 'my subscriptions') {
        response = `END Here are your subscriptions
        1. Reminder: Appointment at Kenyatta University Teaching and Referral Hospital
        `;
      } else if (text === '5*4' || text === 'cancel subscriptions') {
        response = `END You have successfully cancelled your subscriptions
        `;
      }

      // Send the response back to the API
      res.set('Content-Type: text/plain');
      res.send(response);
      return response;
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
        data: error,
      });
    }
  },
};
