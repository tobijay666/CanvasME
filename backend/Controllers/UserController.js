const express = require('express');
var router = express.Router();

const {User} = require('../models/user.js');

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

module.exports = router;