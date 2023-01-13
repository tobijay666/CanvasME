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

router.post('/',(req,res)=>{
    var user = new User({
        Name: req.body.uname,
        Email: req.body.email,
        Password: req.body.password
    });
    user.save((err,doc)=>{
        if(!err){
            res.send(doc);
            console.log('successfully saved');
        }
        else{
            if (err.code == 11000) {
                res.status(422).send(["Duplicate E-mail address found."]);
              } else {
                return next(err);
              }
        }
    });
});

module.exports = router;