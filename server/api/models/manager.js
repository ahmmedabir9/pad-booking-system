const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const moment = require('moment');

const managerSchema = mongoose.Schema({
  username: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 6,
  },
  pad: {
    type: String,
  },
});

const Manager = mongoose.model('Manager', managerSchema);

module.exports = { Manager };
