const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const countries = require("./countries");

const sellerValidation = Joi.object({
  sellerName: Joi.string()
    .max(200)
    .label("Seller name")
    .alter({ new: schema => schema.required() }),
  userId: Joi.objectId()
    .label("User ID")
    .alter({ new: schema => schema.required() }),
  location: Joi.string()
    .label("Location")
    .valid(...Object.keys(countries))
    .messages({
      "any.only": "Location must be a valid country",
    }),
});

const newSellerValidation = sellerValidation.tailor("new");

module.exports = { newSellerValidation, sellerValidation };
