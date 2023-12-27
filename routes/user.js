const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const app = express();

require('dotenv').config();


router.post("/register", userController.registerUser);

router.post('/login', userController.loginUser)

router.post('/logout', userController.logoutUser)

// Protected routes (require authentication)
// router.get("/profile", function(req,res,next){
//   res.send(req.user)
// });

module.exports = router;
