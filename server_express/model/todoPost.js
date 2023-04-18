const joi = require("joi");

const todoPost = joi.object({
  content: joi.string().min(2).max(30).required(),
  user: joi.string().min(2).max(30).required(),

});

exports.todoPost = todoPost;