const express = require("express");
const getTodo = express.Router();
const db = require("../db");

getTodo.get("/", (req, res) => {
  const user = req.query.user;

  const query = "SELECT * from Task where user = ?";


  db.query(query, [user], (err, result) => {
    if (err) {
    } else {
      res.send(result);
    }
  });
});

module.exports = getTodo;