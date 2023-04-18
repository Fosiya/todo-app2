const express = require("express");
const addTodo = express.Router();
const db = require("../db");
const { todoPost } = require("../model/todoPost");

addTodo.post("/", (req, res) => {
  const user = req.body.user;
  const content = req.body.content;

  let validation = todoPost.validate(req.body);
  if (validation.error) {
  
    res.json({ message: validation.error.details[0].message, code: 300 });
    return;
  }

  const query = `INSERT INTO Task (user, content) 
  VALUES (?, ?);`;


  db.query(query, [user, content], (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else {
      
      res.send(result);
    }
  });
});

module.exports = addTodo;