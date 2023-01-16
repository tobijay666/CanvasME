const express = require('express');
const passport = require('passport');
var router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "IGHSasnj*&(*Y&58KJHGB8yusj89j";

// const User = require('../models/user.js');
const User = require('../models/user.js');
require('../auth/passport');



router.get('/',(req,res)=>{
    User.find((err,docs)=>{
        if(!err){
            res.send(docs);
        }
        else{
            console.log(JSON.stringify(err, undefined,2));
        }
    });
});

router.post("/register",async  (req, res, next) => {
    //new user
    var user = new User({
      Name: req.body.uname,
      Email: req.body.email,
      Password: req.body.password,
    });
  
    //save user
  
    user.save((err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        if (err.code == 11000) {
          res.status(422).send(["Duplicate email address found."]);
        } else {
          return next(err);
        }
      }
    });
});


router.post("/login", async (req, res) => {

  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({Email:email});

  if(!user){
    return res.json({status:"Error",error:"Invalid Username/Password"});
  }
  // console.log(user.Password,req.body.password);
  if(await bcrypt.compare(req.body.password, user.Password)){

    const token = jwt.sign(
      {id:user._id, uname:user.Name},
       JWT_SECRET,{expiresIn:"25m"});

    console.log(token);
    return res.json({status:"Ok",error:"",data:token});
  }

  res.json({status:"Error",error:"Invalid Username/Password"});

});

router.post("/change-password", async(req,res)=>{
  const token = req.body.token;
  const newpassword = req.body.password;
  const salt = req.body.saltSecret;

  try{
      const user = jwt.verify(token,JWT_SECRET);
      const id = user.id;

      // let hashLoad = this.hasher(password);
      // console.log(hashLoad);
      const hashedPassword = await bcrypt.hash(newpassword,salt)

      console.log(hashedPassword);
      await User.updateOne({_id:id},
        {
          $set: {Password : hashedPassword
          }
        })
        return res.json({status:"Ok",error:"",data:token});
    }
    catch(err){
      res.json({status:'error', error:err});
    }
  
})



// module.exports = router;
// module.exports.authenticate= (req,res,next)=>{

// router.post("/login", (req, res, next) => {
//   const User = User;
//     passport.authenticate('local', function (err,User,info) {
//       // error from passport middleware
//       console.log(info,User);

//       if (err) return res.status(400).json(err);
//       // registered user
//       else if (User) return res.status(200).json({ "token": User.generateJwt() });
//       // unknown user or wrong password
//       else { 
//         console.log(info,User);
//         // console.log(err,user,next,res);
//         return res.status(404).json(info);}
//   })(req, res);
// });

  
module.exports = router;

// router.post('/',(req,res)=>{
//     var user = new User({
//         Name: req.body.uname,
//         Email: req.body.email,
//         Password: req.body.password
//     });
//     user.save(
//         // (err,doc)=>{
//         // if(!err){
//         //     res.send(doc);
//         //     console.log('successfully saved');
//         // }
//         // else{
//         //     if (err.code == 11000) {
//         //         res.status(422).send(["Duplicate E-mail address found."]);
//         //       } else {
//         //         return next(err);
//         //       }
//         // }
//     // }
//     ).then(()=>{
//         return user.createSession();
//     }).then((refreshToken)=>{
//         return user.generateAccessAuthToken().then((accessToken)=>{
//             return{accessToken, refreshToken}
//         });
//     }).then((authToken)=>{
//         res
//             .header('x-refresh-token', authToken.refreshToken)
//             .header('x-access-token', authToken.accessToken)
//             .send(user)
//     }).catch((e)=>{
//         res.status(400).send(e);
//     })
// });

// router.post('/login',(req,res)=>{
//     let email =req.body.email;
//     let password =req.body.password;

//     user.findByIdCredentials(email,password).then((user)=>{
//         return user.createSession();
//     }).then((refreshToken)=>{
//         return user.generateAccessAuthToken().then((accessToken)=>{
//             return{accessToken, refreshToken}
//         });
//     }).then((authToken)=>{
//         res
//             .header('x-refresh-token', authToken.refreshToken)
//             .header('x-access-token', authToken.accessToken)
//             .send(user)
//     }).catch((e)=>{
//         res.status(400).send(e);
//     })
// })

