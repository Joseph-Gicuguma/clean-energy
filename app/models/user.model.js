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
  phoneNumber: {
    required: false,
    type: String,
  },
  isUser: {
    required: false,
    type: Boolean,
  },
  isProjectManager: {
    required: false,
    type: Boolean,
  },
  projectsSubscribedTo: {
    required: false,
    type: Array,
  },
  projectsCreated: {
    required: false,
    type: Array,
  },
});

module.exports = model('User', UserSchema);
