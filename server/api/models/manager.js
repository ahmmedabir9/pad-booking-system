const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const moment = require("moment");

const managerSchema = mongoose.Schema({
  username: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minlength: 6
  },
  pad: {
    type: String
  },
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
});

managerSchema.methods.generateToken = function(cb) {
  var manager = this;
  var token = jwt.sign(manager._id.toHexString(), "secret");
  var oneHour = moment()
    .add(1, "hour")
    .valueOf();

  manager.tokenExp = oneHour;
  manager.token = token;
  manager.save(function(err, manager) {
    if (err) return cb(err);
    cb(null, manager);
  });
};

managerSchema.statics.findByToken = function(token, cb) {
  var manager = this;

  jwt.verify(token, "secret", function(err, decode) {
    manager.findOne({ _id: decode, token: token }, function(err, manager) {
      if (err) return cb(err);
      cb(null, manager);
    });
  });
};

const Manager = mongoose.model("Manager", managerSchema);

module.exports = { Manager };
