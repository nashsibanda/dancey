const Validator = require("validator");
const validText = require("./valid-text");
const countries = require("./countries");
const formats = require("./formats");

module.exports = {
  validateNewReleaseInput: function (data) {
    let errors = {};

    title = validText(data.title) ? data.title : "";
    description = validText(data.description) ? data.description : "";
    releaseCountry = validText(data.releaseCountry) ? data.releaseCountry : "";
    originalReleaseCountry = validText(data.originalReleaseCountry)
      ? data.originalReleaseCountry
      : "";
    mainArtists = data.mainArtists ? data.mainArtists : [];
    personnel = data.personnel ? data.personnel : [];
    trackListing = data.trackListing ? data.trackListing : [];
    label = data.label ? data.label : [];
    images = data.images ? data.images : [];
    releaseYear = data.releaseYear ? data.releaseYear : null;
    format = validText(data.format) ? data.format : "";

    // Title validation
    if (Validator.isEmpty(title)) {
      errors.title = "Title field is required";
    }

    if (!Validator.isLength(title, { max: 200 })) {
      errors.title = "Title must be 200 characters or less";
    }

    // Description validation
    if (!Validator.isLength(description, { max: 500 })) {
      errors.description = "Description must be 500 characters or less";
    }

    // Release country validation
    if (Validator.isEmpty(releaseCountry)) {
      errors.releaseCountry = "Release country field is required";
    }

    if (!countries[releaseCountry]) {
      errors.releaseCountry = "Release country must be a valid country";
    }

    // Original release country validation
    if (Validator.isEmpty(originalReleaseCountry)) {
      errors.originalReleaseCountry =
        "Original release country field is required";
    }

    if (!countries[originalReleaseCountry]) {
      errors.originalReleaseCountry =
        "Original release country must be a valid country";
    }

    // Release year validation
    if (!releaseYear) {
      errors.releaseYear = "Release year field is required";
    }

    if (releaseYear > 2030 || releaseYear < 1890) {
      errors.releaseYear = "Release year must be between 1890 and 2030";
    }

    // Format validation
    if (Validator.isEmpty(format)) {
      errors.format = "Format field is required";
    }

    if (!Validator.isIn(format, formats)) {
      errors.format = "Format must be a valid format";
    }

    // Return validation
    return {
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  },
  validateUpdateReleaseInput: function (data) {
    let errors = {};

    title = validText(data.title) ? data.title : null;
    description = validText(data.description) ? data.description : null;
    releaseCountry = validText(data.releaseCountry)
      ? data.releaseCountry
      : null;
    originalReleaseCountry = validText(data.originalReleaseCountry)
      ? data.originalReleaseCountry
      : null;
    mainArtists = data.mainArtists ? data.mainArtists : null;
    personnel = data.personnel ? data.personnel : null;
    trackListing = data.trackListing ? data.trackListing : null;
    label = data.label ? data.label : null;
    images = data.images ? data.images : null;
    releaseYear = data.releaseYear ? data.releaseYear : null;
    format = validText(data.format) ? data.format : null;

    // Title validation
    if (title) {
      if (Validator.isEmpty(title)) {
        errors.title = "Title is a required field";
      }

      if (!Validator.isLength(title, { max: 200 })) {
        errors.title = "Title must be 200 characters or less";
      }
    }

    // Description validation
    if (description) {
      if (!Validator.isLength(description, { max: 500 })) {
        errors.description = "Description must be 500 characters or less";
      }
    }

    // Release country validation
    if (releaseCountry) {
      if (!countries[releaseCountry]) {
        errors.releaseCountry = "Release country must be a valid country";
      }
    }

    // Original release country validation
    if (originalReleaseCountry) {
      if (!countries[originalReleaseCountry]) {
        errors.originalReleaseCountry =
          "Original release country must be a valid country";
      }
    }

    // Release year validation
    if (releaseYear) {
      if (releaseYear > 2030 || releaseYear < 1890) {
        errors.releaseYear = "Release year must be between 1890 and 2030";
      }
    }

    // Format validation
    if (format) {
      if (!Validator.isIn(format, formats)) {
        errors.format = "Format must be a valid format";
      }
    }

    if (personnel) {
      personnel.forEach(entry => {
        const role = validText(entry.role) ? entry.role : "";
        const { personnelId } = entry;

        if (Validator.isEmpty(role)) {
          errors[personnelId] = "Personnel role field is required";
        }

        if (!Validator.isLength(role, { max: 200 })) {
          errors[personnelId] = "Personnel role must be 200 characters or less";
        }
      });
    }

    // Return validation
    return {
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  },
};
