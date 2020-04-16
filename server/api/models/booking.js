const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
  bandname: {
    type: String,
    require: true,
  },
  bandmobile: {
    type: String,
    require: true,
  },
  bandmail: {
    type: String,
    require: true,
  },
  pad: {
    type: String,
    require: true,
  },
  shift: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  bookingid: {
    type: String,
    require: true,
  },
  payment: {
    type: Number,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
  status: {
    type: Number,
    default: 0,
  },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = { Booking };
