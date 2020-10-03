require("dotenv").config();
//const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
//const User = require('../models/User.model');

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  // Check for token
  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    //add user from payload
    req.user = decoded;

    next();
  } catch (error) {
    res.status(400).json({ msg: "Token is not valid" });
  }
}

module.exports = auth;
