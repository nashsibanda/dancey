const Joi = require("@hapi/joi");
const countries = require("./countries");

const registerValidation = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required().label("Username"),
  email: Joi.string().email().required().label("Email"),
  firstName: Joi.string().alphanum().required().label("First name"),
  lastName: Joi.string().alphanum().required().label("Last name"),
  password: Joi.string().label("Password").required(),
  confPassword: Joi.string()
    .required()
    .valid(Joi.ref("password"))
    .messages({ "any.only": "Passwords must match" }),
  location: Joi.string()
    .required()
    .valid(...Object.keys(countries))
    .label("Location")
    .messages({
      "any.only": "Location must be a valid country",
    }),
  birthday: Joi.date().less("now"),
});

const loginValidation = Joi.object({
  email: Joi.string().email().required().label("Email"),
  password: Joi.string().required().label("Password"),
});

module.exports = { registerValidation, loginValidation };
