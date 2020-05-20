const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const reviewTypes = [
  "release",
  "personnel",
  "product",
  "seller",
  "track",
  "buyer",
];

const reviewValidation = Joi.object({
  userId: Joi.objectId()
    .alter({ explicit: schema => schema.required() })
    .label("User ID"),
  body: Joi.string().label("Review body"),
  username: Joi.string()
    .alter({ explicit: schema => schema.required() })
    .label("Review author username"),
  rating: Joi.number().min(1).max(5).required().label("Rating"),
  resourceType: Joi.string()
    .label("Resource type")
    .valid(...reviewTypes)
    .alter({ explicit: schema => schema.required() }),
  resourceId: Joi.objectId()
    .label("Resource ID")
    .alter({ explicit: schema => schema.required() }),
});

const explicitReviewValidation = reviewValidation.tailor("explicit");

module.exports = { explicitReviewValidation, reviewValidation };
