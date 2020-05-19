const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const commentValidation = Joi.object({
  userId: Joi.objectId()
    .alter({ new: schema => schema.required() })
    .label("User ID"),
  body: Joi.string().required().label("Comment body"),
  username: Joi.string()
    .alter({ new: schema => schema.required() })
    .label("Comment author username"),
  parentCommentId: Joi.objectId().allow(null).label("Parent comment ID"),
});

const newCommentValidation = commentValidation.tailor("new");
const updateCommentValidation = commentValidation;

module.exports = { newCommentValidation, updateCommentValidation };
