const express = require('express');
var router = express.Router();

const Room = require('../models/room.js');

router.get('/',(req,res)=>{
    Room.find((err,docs)=>{
        if(!err){
            res.send(docs);
        }
        else{
            console.log(JSON.stringify(err, undefined,2));
        }
    });
});

router.post('/',(req,res)=>{
    var room = new Room({
        Title: req.body.title
    });
    room.save((err,doc)=>{
        if(!err){
            res.send(doc);
            console.log('successfully saved');
        }
        else{
            console.log(JSON.stringify(err, undefined,2));
        }
    });
});

router.post('/join',async (req,res)=>{
    const roomIdx = req.body.title;
    


    if(await Room.findOne({Title:roomIdx})){
        return res.json({status:"Ok",error:"",data:roomIdx});
    }
    res.json({status:"Error",error:"Invalid Room ID"});

});

module.exports = router;