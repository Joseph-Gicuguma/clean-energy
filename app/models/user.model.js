const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
});

module.exports = model('User', UserSchema);
