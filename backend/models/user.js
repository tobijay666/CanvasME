const mongoose = require('mongoose');
const ld = require('lodash');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const jwtSecret = 't3h54i56s7r67a464n249d2o65m8s24e78cr641e0t';

// var User = mongoose.model('User',{
//     Name: {
//         type:String,
//         trim: true,
//         required:true,
//         unique: "This Username already exists!"
//     },
//     Email: {
//         type:String,
//         required: true,
//         unique:true
//     },
//     Password: {
//         type:String,
//         required:true,
//         minlength:6
//     },
//     saltSecret: String
    
// });
var userSchema = new mongoose.Schema({
            Name: {
                type:String,
                trim: true,
                required:true,
                unique: "This Username already exists!"
            },
            Email: {
                type:String,
                required: true,
                unique:"This Email already exists!"
            },
            Password: {
                type:String,
                required:true,
                minlength:[6,'Password must have at least 6 characters']
            },
            saltSecret: String
  });

  userSchema.path('Email').validate((val)=>{
    regex=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(val); 
  },'invalid email');
  
  //Events
  userSchema.pre("save", function (next) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this.Password, salt, (err, hash) => {
        this.Password = hash;
        this.saltSecret = salt;
        next();
      });
    });
  });
  

userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

  
var User = mongoose.model("User", userSchema);
// export { User };
  module.exports = {User};


// User.schema.methods.toJSON = function(){
//     const user = this;
//     const userObject = user.toObject();

//     return ld.omit(userObject,['password','sessions'])
// }

// User.schema.methods.generateAccessAuthToken = function(){
//     const user = this;
//     // const userObject = user.toObject();

//     return new Promise((resolve, reject)=>{
//         // JWT creation
//         jwt.sign({ _id: user._id.toHexString() },jwtSecret,{ expiresIn: "15m"}, (err, token)=>
//         {
//             if (!err){
//                 resolve(token);
//             } else{
//                 reject();
//             }
//         })
//     })
// }

// User.schema.methods.generateRefreshAuthToken = function(){


//     return new Promise((resolve, reject)=>{
//         crypto.randomBytes(64, (err, buf)=>{
//             if(!err){
//                 let token = buf.toString('hex');
//                 return resolve(token);
//             }
//         });
        
//     });
// }

// User.schema.methods.createSession = function(){
//     const user = this;

//     return user.generateRefreshAuthToken().then((refreshToken)=>{
//         return saveSessionToDatabase(user, refreshToken);
//     }).then((refreshToken)=>{
//         return refreshToken;
//     }).catch((e)=>{
//         return Promise.reject('Failed to save session to database. \n'+e);
//     })
// }


// User.schema.statics.findByIdAndToken = function(_id,token){
//     const user = this;

//     return user.findOne ({
//         _id,
//         'session.token':token
//     });
// }

// User.schema.statics.findByIdCredentials = function(email,password){
//     let user =this;
//     return user.findOne({email}).then((user)=>{
//         if(!user) return Promise.reject;

//         return new Promise ((resolve,reject)=>{
//             bcrypt.compare(password,user.password,(err,res)=>{
//                 if(res) resolve(user);
//                 else{
//                     reject();
//                 }
//             })
//         })
//     })
// }


// User.schema.hasRefreshedTokenExpired = (expiresAt) =>{
//     let secondSinceEpoch = Date.now()/1000;
//     if (expiresAt>secondSinceEpoch){
//         return false;
//     }
//     else{
//         return true;
//     }
// }


// User.schema.pre('save',function(next){
//     let user = this;
//     let costfactor = 10;

//     if(user.isModified('password')){
//         // if password was edited
//         bcrypt.genSalt(costfactor, (err,salt)=>{
//             bcrypt.hash(user.password,salt,(err,hash)=>{
//                 user.password = hash;
//                 next();
//             })
//         })
//     } else{
//         next();
//     }
// })


// let saveSessionToDatabase = (user, refreshToken) =>{
//     return new Promise((resolve,reject)=>{
//         let expiresAt = generateRefreshTokenExpiryTime();

//         user.sessions.push({'token':refreshToken, expiresAt});

//         user.save().then(()=>{
//             return resolve(refreshToken);
//         }).catch((e) =>{
//             reject(e);
//         });
//     })
// }

// let generateRefreshTokenExpiryTime = () =>{
//     let daysUntilExpire = "10";
//     let secondsuntilExpire = ((daysUntilExpire*24)*60)*60;
//     return ((Date.now / 1000)+secondsuntilExpire);
// }

