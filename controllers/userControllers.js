// controllers/userController.js

// Assuming you have a User model that represents user data
const User = require('../models/user');
const passport = require("passport");
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.registerUser = async (req, res) => {
  try {
    const newUser = new User(req.body );
    await newUser.save();

    res.status(201).json({ user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.loginUser = async (req, res) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
         info
      });
    }
    req.login(user, { session: false }, (err) => {

      if (err) res.send(err);

      const token = jwt.sign(user.toJSON(), process.env.secretKey);

      return res.json({id:user._id, username:user.username, email:user.email, token:token} );
    });
  })(req, res);
};

exports.logoutUser = (req, res) => {
  // console.log(req.body);                                                   
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed', error: err , req:req});
    }
    return res.status(200).json({ request:req.body , message: 'Logged out successfully' });
  });
};

exports.getUserProfile = (req, res) => {
  // The user's information is available in req.user (provided by the authentication middleware)
  res.status(200).json({ user: req.user });
};
