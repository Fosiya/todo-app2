const express = require("express");
const deleteTodo = express.Router();
const db = require("../db");
const { todoDelete } = require("../model/todoDelete");

deleteTodo.delete("/", (req, res) => {
  const taskID = req.body.id;
  let validation = todoDelete.validate(req.body);
  if (validation.error) {
    res.json({ message: validation.error.details[0].message });
    return;
  }

  const query = "DELETE from Task where id = ?";

  db.query(query, [taskID], (err, result) => {
    if (err) {
    } else {
      res.send(result);
    }
  });
});

module.exports = deleteTodo;