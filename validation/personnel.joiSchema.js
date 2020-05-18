const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
countries = require("./countries");

const personnelValidation = Joi.object({
  name: Joi.string()
    .max(200)
    .label("Name")
    .alter({
      new: schema => schema.required(),
    }),
  alsoKnownAs: Joi.array().items(Joi.string().max(200)).label("Also known as"),
  dateOfBirth: Joi.date()
    .less("now")
    .greater("01-01-1800")
    .label("Date of birth"),
  countryOfOrigin: Joi.string()
    .valid(...Object.keys(countries))
    .label("Country of origin")
    .messages({ "any.only": "Country of origin must be a valid country" }),
});

const newPersonnelValidation = personnelValidation.tailor("new");
const updatePersonnelValidation = personnelValidation;

module.exports = { newPersonnelValidation, updatePersonnelValidation };
