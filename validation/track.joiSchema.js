const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const trackValidation = Joi.object({
  title: Joi.string()
    .max(200)
    .label("Title")
    .alter({ new: schema => schema.required() }),
  artists: Joi.array().items(Joi.objectId()).label("Artist(s)"),
  personnel: Joi.array()
    .items(
      Joi.object().keys({
        personnelId: Joi.objectId(),
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

module.exports = { newTrackValidation, updateTrackValidation };
