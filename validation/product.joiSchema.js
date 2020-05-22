const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const currencies = require("./currencies");
const mediaCondition = require("./mediaCondition");

const productValidation = Joi.object({
  release: Joi.objectId()
    .label("Release ID")
    .alter({ new: schema => schema.required() }),
  price: Joi.number()
    .positive()
    .label("Price")
    .precision(2)
    .alter({ new: schema => schema.required() }),
  currency: Joi.string()
    .label("Currency")
    .valid(...Object.keys(currencies))
    .messages({
      "any.only": "Currency must be a valid currency",
    })
    .alter({ new: schema => schema.required() }),
  condition: Joi.string()
    .label("Condition")
    .valid(...Object.keys(mediaCondition))
    .messages({
      "any.only": "Condition must be a valid media condition",
    })
    .alter({ new: schema => schema.required() }),
  sellerId: Joi.objectId()
    .label("Seller ID")
    .alter({ new: schema => schema.required() }),
  description: Joi.string().label("Description").max(500),
});

const newProductValidation = productValidation.tailor("new");

module.exports = { productValidation, newProductValidation };
