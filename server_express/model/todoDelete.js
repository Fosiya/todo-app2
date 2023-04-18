const joi = require("joi");

const todoDelete = joi.object({
  id: joi.number().integer().min(1).required(),
});

exports.todoDelete = todoDelete;