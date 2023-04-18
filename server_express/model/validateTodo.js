const Joi = require("joi");

const todoSchema = Joi.object({
  completed: Joi.boolean().required(),
});

const validateTodo = (todo) => {
  const { error } = todoSchema.validate(todo);
  if (error) {
    throw new Error(error.details[0].message);
  }
};

module.exports = validateTodo;