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

    // Date of birth validation
    if (dateOfBirth) {
      if (dateOfBirth > Date.now()) {
        errors.dateOfBirth = "Date of birth must be in the past";
      }
    }

    // Country of origin validation
    if (countryOfOrigin) {
      if (!countries[countryOfOrigin]) {
        errors.countryOfOrigin = "Country of origin must be a valid country";
      }
    }

    // Also known as validation
    if (alsoKnownAs.length > 0) {
      let alsoKnownAsErrors = {};
      const empty = element => Validator.isEmpty(element);
      const tooLong = element => !Validator.isLength(element, { max: 200 });
      if (alsoKnownAs.some(empty)) {
        alsoKnownAsErrors.empty = "One of the also known as fields is empty";
      }
      if (alsoKnownAs.some(tooLong)) {
        alsoKnownAsErrors.tooLong =
          "One of the also known as fields is too long; each must be 200 characters or less";
      }
      if (Object.keys(alsoKnownAsErrors).length > 0) {
        errors.alsoKnownAs = alsoKnownAsErrors;
      }
    }

    return {
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  },
  validateUpdatePersonnelInput: data => {
    let errors = {};

    name = validText(data.name) ? data.name : null;
    alsoKnownAs = data.alsoKnownAs ? data.alsoKnownAs : null;
    dateOfBirth = data.dateOfBirth ? data.dateOfBirth : null;
    countryOfOrigin = validText(data.countryOfOrigin)
      ? data.countryOfOrigin
      : null;

    // Name validation
    if (name) {
      if (Validator.isEmpty(name)) {
        errors.name = "Name is a required field";
      }

      if (!Validator.isLength(name, { max: 200 })) {
        errors.name = "Name must be 200 characters or less";
      }
    }

    // Date of birth validation
    if (dateOfBirth) {
      if (dateOfBirth) {
        if (dateOfBirth > Date.now()) {
          errors.dateOfBirth = "Date of birth must be in the past";
        }
      }
    }

    // Country of origin validation
    if (countryOfOrigin) {
      if (countryOfOrigin) {
        if (!countries[countryOfOrigin]) {
          errors.countryOfOrigin = "Country of origin must be a valid country";
        }
      }
    }

    // Also known as validation
    if (alsoKnownAs.length > 0) {
      let alsoKnownAsErrors = {};
      const empty = element => Validator.isEmpty(element);
      const tooLong = element => !Validator.isLength(element, { max: 200 });
      if (alsoKnownAs.some(empty)) {
        alsoKnownAsErrors.empty = "One of the also known as fields is empty";
      }
      if (alsoKnownAs.some(tooLong)) {
        alsoKnownAsErrors.tooLong =
          "One of the also known as fields is too long; each must be 200 characters or less";
      }
      if (Object.keys(alsoKnownAsErrors).length > 0) {
        errors.alsoKnownAs = alsoKnownAsErrors;
      }
    }

    return {
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  },
};
