const passport = require('passport');
const loaclaStratergy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var User = mongoose.model('User');

passport.use(
    new loaclaStratergy({usernameField:'email'},
    (username,password,done)=>{
        User.findOne({email:username},
            (err,user)=>{
                if(err)
                    return done(err);
                else if(!user)
                    return done(null,false,{message:'Email is not registered'});
                else if(!user.verifyPassword(password))
                    return done(null,false,{message:'Worng password'});
                else
                    return done(null, user);
            })
    })
)