const mongoose = require('mongoose');

const padSchema = mongoose.Schema({
  padname: {
    type: String,
    require: true,
  },
  slug: {
    type: String,
    require: true,
  },
  desc: {
    type: String,
  },
  manager: {
    type: String,
  },
  padmobile: {
    type: String,
    require: true,
  },
  padaddress: {
    type: String,
  },
  area: {
    type: String,
  },
  district: {
    type: String,
  },
  image: {
    type: String,
  },
  adpay: {
    type: Number,
    default: 0,
  },
  booked: {
    type: Number,
    default: 0,
  },
});

const Pad = mongoose.model('Pad', padSchema);

module.exports = { Pad };
