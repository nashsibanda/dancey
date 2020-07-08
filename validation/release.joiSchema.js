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
  mainArtists: Joi.array().items(Joi.objectId()).label("Main artists"),
  personnel: Joi.array().items(
    Joi.object()
      .keys({
        personnelIds: Joi.array().items(Joi.objectId()),
        role: Joi.string().max(200),
        _id: Joi.objectId(),
      })
      .label("Personnel")
  ),
  trackListing: Joi.array()
    .items(
      Joi.object().keys({
        order: Joi.number().integer().min(1),
        sideOrDisc: Joi.number().integer().min(1).allow(null),
        trackId: Joi.objectId().allow(null),
        _id: Joi.objectId(),
      })
    )
    .label("Track listing"),
  label: Joi.array()
    .items(
      Joi.object().keys({
        catalogueNumber: Joi.string().max(20).allow(null),
        labelIds: Joi.array().items(Joi.objectId()),
      })
    )
    .label("Label"),
  description: Joi.string().max(500).label("Description"),
  images: Joi.array().items(
    Joi.object()
      .keys({
        description: Joi.string().max(200),
        imageUrl: Joi.string().uri({ allowRelative: true }),
        mainImage: Joi.bool(),
        _id: Joi.objectId(),
      })
      .label("Images")
  ),
  videos: Joi.array().items(
    Joi.object()
      .keys({
        description: Joi.string().max(200),
        title: Joi.string().max(100),
        videoUrl: Joi.string().uri(),
        _id: Joi.objectId(),
      })
      .label("Videos")
  ),
  releaseYear: Joi.number().min(1880).max(2030).label("Release year"),
  format: Joi.string()
    .valid(...formats)
    .label("Format")
    .messages({
      "any.only": '"Format" must be a valid format',
    }),
  releaseCountry: Joi.string()
    .valid(...Object.keys(countries))
    .label("Release country")
    .messages({
      "any.only": '"Release country" must be a valid country',
    }),
  originalReleaseCountry: Joi.string()
    .valid(...Object.keys(countries))
    .label("Original release country")
    .messages({
      "any.only": '"Original release country" must be a valid country',
    }),
  comments: Joi.array().items(Joi.objectId()).label("Comments"),
});

const newReleaseValidation = releaseValidation.tailor("new");
const updateReleaseValidation = releaseValidation;

module.exports = { newReleaseValidation, updateReleaseValidation };
