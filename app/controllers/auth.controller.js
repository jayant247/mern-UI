const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Create and Save a new Note

// @route POST api/User
// @dec Create A Post
// @access private

exports.check = (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: "User does not exists" });

    // validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

      jwt.sign(
        { id: user.id, username: user.name },
        process.env.JWT_KEY,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            }
          });
        }
      );
    });
  });
};

exports.getUser = (req,res) =>{
    User.findById(req.user.id)
    .select('-password')
    .then(user =>  res.json(user));
}