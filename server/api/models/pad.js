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
  manager: {
    type: String,
  },
  padmobile: {
    type: String,
    require: true,
  },
  padaddress: {
    type: String,
    require: true,
  },
  area: {
    type: String,
    require: true,
  },
  district: {
    type: String,
    require: true,
  },
  image: {
    type: String,
  },
  ratings: {
    type: Object,
    require: true,
  },
  instruments: {
    type: Object,
  },
  adpay: {
    type: Number,
    default: 0,
  },
  expay: {
    type: Array,
  },
});

const Pad = mongoose.model('Pad', padSchema);

module.exports = { Pad };
