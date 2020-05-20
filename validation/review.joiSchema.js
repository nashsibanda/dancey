const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const reviewValidation = Joi.object({
  userId: Joi.objectId()
    .alter({ explicit: schema => schema.required() })
    .label("User ID"),
  body: Joi.string().label("Review body"),
  username: Joi.string()
    .alter({ explicit: schema => schema.required() })
    .label("Review author username"),
  rating: Joi.number().min(1).max(5).required().label("Rating"),
});

const explicitReviewValidation = reviewValidation.tailor("explicit");

module.exports = { explicitReviewValidation, reviewValidation };
