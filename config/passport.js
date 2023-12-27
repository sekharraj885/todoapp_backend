const passport = require('passport');
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JWTStrategy   = passportJWT.Strategy;
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../models/user');

require('dotenv').config();

passport.use(new JWTStrategy(
  {
  jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey : process.env.secretKey
  },
  function(jwtPayLoad,cb){
  console.log("payload",jwtPayLoad);
    return userModel.findOneById(jwtPayLoad.id)
    .then(user =>{
      return cb(null, user)
    })
    .catch(err =>{
      console.error("JWT Strategy Error:", err);
      return cb(err)
    })
  }
))

// Login 
passport.use(new LocalStrategy({
  usernameField:'email',
  passwordField:'password'
},
 async (email,password,cb)=>{
  try{
    const user = await userModel.findOne({email, password}).exec();
    if(!user){
      return cb(null ,false, 'Incorrect mail or password')
    }
    return cb(null, user, 'Logged in successfully!');
  } catch (err){
    return cb(err)
  }
}))
