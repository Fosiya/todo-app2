const express = require("express");
const updateTodo = express.Router();
const db = require("../db");
const validateTodo = require("../model/validateTodo");

updateTodo.put("/:id", (req, res) => {
  const { id } = req.params;
  const completed  = req.body.completed;
  

  try {
    validateTodo({ completed });
  } catch (error) {
    return res.status(400).send(error.message);
  }

  const query = "UPDATE Task SET completed=? WHERE id=?";

  db.query(query, [completed, id], (err, result) => {
    if (err) {
    } else {
      res.send(result);
    }
  });
});

module.exports = updateTodo;