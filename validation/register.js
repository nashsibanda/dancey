const Validator = require("validator");
const validText = require("./valid-text");
const countries = require("./countries");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  username = validText(data.username) ? data.username : "";
  firstName = validText(data.firstName) ? data.firstName : "";
  lastName = validText(data.lastName) ? data.lastName : "";
  email = validText(data.email) ? data.email : "";
  location = validText(data.location) ? data.location : "";
  password = validText(data.password) ? data.password : "";
  confPassword = validText(data.confPassword) ? data.confPassword : "";

  // Username validation
  if (Validator.isEmpty(username)) {
    errors.username = "Username is required";
  }

  if (!Validator.isLength(username, { min: 2, max: 30 })) {
    errors.username = "Username must be between 2 and 30 characters long";
  }

  if (!Validator.isAlphanumeric(username)) {
    errors.username = "Username must only contain letters and numbers";
  }

  // Name validation
  if (Validator.isEmpty(firstName)) {
    errors.firstName = "First name is required";
  }

  if (Validator.isEmpty(lastName)) {
    errors.lastName = "Last name is required";
  }

  // Email validation
  if (Validator.isEmpty(email)) {
    errors.email = "Email is required";
  }

  if (!Validator.isEmail(email)) {
    errors.email = "Email is not a valid email address";
  }

  // Location validation
  if (Validator.isEmpty(location)) {
    errors.location = "Location is required";
  }

  if (!countries[location]) {
    errors.location = "Location must be a valid country";
  }

  // Password validation
  if (Validator.isEmpty(password)) {
    errors.password = "Password is required";
  }

  if (!Validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 characters";
  }

  if (Validator.isEmpty(confPassword)) {
    errors.confPassword = "Confirm password field is required";
  }

  if (!Validator.equals(password, confPassword)) {
    errors.confPassword = "Passwords must match";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
