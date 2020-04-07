const mongoose = require("mongoose");

const shiftSchema = mongoose.Schema({
  shiftname: {
    type: String,
    require: true,
    default: "Practice Sessiion"
  },
  pad: {
    type: String,
    require: true
  },
  shiftstart: {
    type: String,
    require: true
  },
  shiftend: {
    type: String,
    require: true
  },
  rent: {
    type: Number,
    require: true
  }
});

const Shift = mongoose.model("Shift", shiftSchema);

module.exports = { Shift };
