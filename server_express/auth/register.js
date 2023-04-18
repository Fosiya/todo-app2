const express = require("express");
const register = express.Router();
const db = require("../db");
const { authSchema } = require("../model/authSchema");

register.post("/", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  let validation = authSchema.validate(req.body);
  if (validation.error) {
    res.statusCode=201;
    res.json({ message: validation.error.details[0].message, code:300 });
    return;
  }

  const query_user = "INSERT INTO User (username, password) VALUES (?, ?);";

  db.query(query_user, [username, password], (err, result) => {
    if (err) {
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = register;