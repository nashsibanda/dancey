const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const countries = require("./countries");

const userValidation = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .label("Username")
    .alter({ new: schema => schema.required() }),
  email: Joi.string()
    .email()
    .label("Email")
    .alter({ new: schema => schema.required() }),
  firstName: Joi.string()
    .alphanum()
    .label("First name")
    .alter({ new: schema => schema.required() }),
  lastName: Joi.string()
    .alphanum()
    .label("Last name")
    .alter({ new: schema => schema.required() }),
  password: Joi.string()
    .label("Password")
    .alter({ new: schema => schema.required() }),
  confPassword: Joi.string()
    .valid(Joi.ref("password"))
    .messages({ "any.only": "Passwords must match" })
    .label("Confirm password")
    .alter({ new: schema => schema.required() }),
  location: Joi.string()
    .valid(...Object.keys(countries))
    .label("Location")
    .messages({
      "any.only": "Location must be a valid country",
    })
    .alter({ new: schema => schema.required() }),
  birthday: Joi.date().less("now").label("Birthday"),
  comments: Joi.array().items(Joi.objectId()).label("Comments"),
  isAdmin: Joi.bool().forbidden(),
});

const loginValidation = Joi.object({
  email: Joi.string().email().required().label("Email"),
  password: Joi.string().required().label("Password"),
});

const registerValidation = userValidation.tailor("new");

module.exports = { registerValidation, loginValidation, userValidation };
