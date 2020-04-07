const validator = require('validator');

const validate = (manager) => {
  let error = {};

  if (!manager.email) {
    error.email = 'Please Provide Your Email';
  } else if (!validator.isEmail(manager.email)) {
    error.email = 'Please Provide a Valid Email';
  }

  if (!manager.password) {
    error.password = 'Please Provide a Password';
  }
  return {
    error,
    isValid: Object.keys(error).length === 0,
  };
};

module.exports = validate;
