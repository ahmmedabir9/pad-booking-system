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
  ratings: {
    type: Object,
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
