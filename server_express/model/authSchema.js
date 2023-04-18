const joi = require("joi");

const authSchema = joi.object({
  username: joi.string().min(3).max(30).required(),
  password: joi.string().min(6).max(30).required(),
});

exports.authSchema = authSchema;