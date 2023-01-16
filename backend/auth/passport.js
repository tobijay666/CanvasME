const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const User = require('../models/user.js');

// var User = mongoose.model('User');

// passport.use(
//     new localStrategy({usernameField:'Email'},
//     (username,password,done)=>{
//         User.findOne({Email:username},
//             (err,user)=>{
//                 console.log(user);
//                 if(err)
//                     return done(err);
//                 else if(!user)
//                     return done(null,false,{message:'Email is not registered'});
//                 else if(!user.verifyPassword(password))
//                     return done(null,false,{message:'Wrong password'});
//                 else{ 
//                     return  done(null, user);}
//             })
//     })
// )