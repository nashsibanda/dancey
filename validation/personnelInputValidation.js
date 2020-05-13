const Validator = require("validator");
const validText = require("./valid-text");
const countries = require("./countries");

module.exports = {
  validateNewPersonnelInput: data => {
    let errors = {};

    name = validText(data.name) ? data.name : "";
    alsoKnownAs = data.alsoKnownAs ? data.alsoKnownAs : [];
    dateOfBirth = data.dateOfBirth ? data.dateOfBirth : null;
    countryOfOrigin = validText(data.countryOfOrigin)
      ? data.countryOfOrigin
      : "";

    // Name validation

    if (Validator.isEmpty(name)) {
      errors.name = "Name is a required field";
    }

    if (!Validator.isLength(name, { max: 200 })) {
      errors.name = "Name must be 200 characters or less";
    }

    if (dateOfBirth) {
      if (dateOfBirth > Date.now()) {
        errors.dateOfBirth = "Date of birth must be in the past";
      }
    }

    if (countryOfOrigin) {
      if (!countries[countryOfOrigin]) {
        errors.countryOfOrigin = "Country of origin must be a valid country";
      }
    }
  },
};
