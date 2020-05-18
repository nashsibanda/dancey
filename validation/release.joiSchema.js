const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const countries = require("./countries");
const formats = require("./formats");

const releaseValidation = Joi.object({
  title: Joi.string()
    .max(200)
    .label("Title")
    .alter({
      new: schema => schema.required(),
    }),
  mainArtists: Joi.array().items(Joi.objectId()),
  personnel: Joi.array().items(
    Joi.object().keys({
      personnelId: Joi.objectId(),
      role: Joi.string().max(200),
      _id: Joi.objectId(),
    })
  ),
  trackListing: Joi.array().items(
    Joi.object().keys({
      order: Joi.number().integer().min(1),
      trackId: Joi.objectId().allow(null),
      _id: Joi.objectId(),
    })
  ),
  label: Joi.array().items(Joi.objectId()),
  description: Joi.string().max(500),
  images: Joi.array().items(
    Joi.object().keys({
      description: Joi.string().max(200),
      imageUrl: Joi.string().uri({ allowRelative: true }),
      mainImage: Joi.bool(),
      _id: Joi.objectId(),
    })
  ),
  releaseYear: Joi.number().min(1880).max(2030),
  format: Joi.string()
    .valid(...formats)
    .label("Format")
    .messages({
      "any.only": "Format must be a valid format",
    }),
  releaseCountry: Joi.string()
    .valid(...Object.keys(countries))
    .label("Release country")
    .messages({
      "any.only": "Release country must be a valid country",
    }),
  originalReleaseCountry: Joi.string()
    .valid(...Object.keys(countries))
    .label("Original release country")
    .messages({
      "any.only": "Original release country must be a valid country",
    }),
});

const newReleaseValidation = releaseValidation.tailor("new");
const updateReleaseValidation = releaseValidation;

module.exports = { newReleaseValidation, updateReleaseValidation };
