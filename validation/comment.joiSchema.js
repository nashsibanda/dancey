const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const commentValidation = Joi.object({
  userId: Joi.objectId()
    .alter({ explicit: schema => schema.required() })
    .label("User ID"),
  body: Joi.string().required().label("Comment body"),
  username: Joi.string()
    .alter({ explicit: schema => schema.required() })
    .label("Comment author username"),
  parentCommentId: Joi.objectId().allow(null).label("Parent comment ID"),
  deleted: Joi.bool().label("Deleted toggle"),
});

const explicitCommentValidation = commentValidation.tailor("explicit");

module.exports = { explicitCommentValidation, commentValidation };
