const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const trackValidation = Joi.object({
  title: Joi.string()
    .max(200)
    .label("Title")
    .alter({ new: schema => schema.required() }),
  mainArtists: Joi.array().items(Joi.objectId()).label("Main Artist(s)"),
  personnel: Joi.array()
    .items(
      Joi.object().keys({
        personnelIds: Joi.array().items(Joi.objectId()),
        role: Joi.string().max(200).label("Role"),
        _id: Joi.objectId(),
      })
    )
    .label("Personnel"),
  originalVersion: Joi.objectId().label("Original version").allow(null),
  duration: Joi.number().integer().label("Duration"),
  writers: Joi.array().items(Joi.objectId()).label("Writer(s)"),
  comments: Joi.array().items(Joi.objectId()).label("Comments"),
});

const newTrackValidation = trackValidation.tailor("new");
const updateTrackValidation = trackValidation;
const trackListingValidation = Joi.object({
  track: newTrackValidation,
  trackListing: Joi.object()
    .keys({
      order: Joi.number().integer().min(1),
      sideOrDisc: Joi.number().integer().min(1).allow(null),
    })
    .label("Track listing"),
});

module.exports = {
  newTrackValidation,
  updateTrackValidation,
  trackListingValidation,
};
