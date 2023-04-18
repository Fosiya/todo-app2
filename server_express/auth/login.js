const express = require("express");
const login = express.Router();
const db = require("../db");
const { authSchema } = require("../model/authSchema");

login.post("/", (req, res) => {

  const username = req.body.username;
  const password = req.body.password;
  let validation = authSchema.validate({ username: username, password: password });
  
  if (validation.error) {
    res.statusCode = 401;
    res.json({ message: validation.error.details[0].message });
    return;
  }

  const query = "SELECT * FROM User WHERE username = ? and password = ?";

  db.query(query, [username, password], (err, result) => {
    if (err) {
    }

    if (result.length > 0) {
      res.send(result);
    } else {
      res.sendStatus(500);
    }
  });
});

module.exports = login;