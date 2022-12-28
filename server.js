// importing modules
var express = require('express');
var socket = require('socket.io');
// var mongoose = require('mongoose');
var cors = require('cors');
var path = require('path');

var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

console.log("Running");



// var io = socket(server, {
//     cors: {
//       origin: "http://localhost:3000",
//       methods: ["GET", "POST"],
//       credentials: true,
//     },
//   });

var io = socket(server);

io.sockets.on('connection',newConnection);
function newConnection(socket){
    console.log('newConnection: ' + socket.id);
    
    socket.on('mouse', mouseMessage);

    function mouseMessage(data){
        socket.broadcast.emit('mouse',data); // send to every one except me
        // io.sockets.emit('mouse',data); Globally sending message including me
        console.log(data);
    }
    // console.log(socket);
}


const bodyParser = require('body-parser');
const { mongoose } = require('./DB/mongoose');


// Loading the models
const { Room } = require('./DB/models');

// Load middleware
app.use(bodyParser.json());


/* ROUTE HANDLERS */

/* PLAY ROUTES */

/* 
    GET /rooms
    * getting all rooms available
*/
app.get('/rooms',( req, res)=>{
    // return all rooms available.
    Room.find({}).then((rooms)=>{
        res.send(rooms);
    })

})

app.get('/rooms/:roomId',( req, res)=>{
    // return one specific room.
    Room.findOne({
        _id: req.params.roomId
    }).then((rooms)=>{
        res.send(rooms);
    })

})

/* 
    POST /rooms
    * Create a new room
*/
app.post('/rooms',( req, res)=>{
    // Create a new room
    let title = req.body.title;

    let newRoom = new Room({
        title
    });
    newRoom.save().then((roomDoc) =>{
        // the full Room document is returned
        res.send(roomDoc);
    })

});

/* 
    PATCH /rooms
    * Update a room
*/
app.patch('/rooms',( req, res)=>{
    // Update a room

})

/* 
    DELETE /rooms
    * Update a room
*/
app.delete('/rooms/:id',( req, res)=>{
    // delete a room
    // takes in ID
    Room.findOneAndRemove(
        {
            _id: req.params.id
        }
    ).then((removedRoomDoc)=>{
        res.send(removedRoomDoc);
    });

});