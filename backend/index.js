const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var socket = require('socket.io');


const {mongoose} = require('./db.js');

var roomController = require('./controllers/RoomController.js');

var connection = require('./models/ioconnection.js');


var app = express();
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:4200'}));


var server = app.listen(3000, ()=> console.log('Server started at port: 3000'));
// server.listen(3000, ()=> console.log('Server started at port: 3000'));
app.use('/rooms',roomController);

// socket work
var io = socket(server,{
    cors: {
      origin: "http://localhost:4200",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

io.sockets.on('connection',(socket)=>{
    console.log('newConnection' + socket.id);

    socket.on(connection.create, function(data){
        io.socket.emit('connection.create',data);
    });

    socket.on('chat', chatMessage);

    function chatMessage(data){
      socket.broadcast.emit('chat',data); // send to every one except me
      // io.sockets.emit('mouse',data); Globally sending message including me
      console.log(data);
  }
    // listen to chat
    // socket.on('chat', function(data){
      
      // io.socket.emit('chat',data);
    // });

    socket.on('mouse', mouseMessage);

    function mouseMessage(data){
        socket.broadcast.emit('mouse',data); // send to every one except me
        // io.sockets.emit('mouse',data); Globally sending message including me
        console.log(data);
    }

})


// server.use(cors({origin: 'http://localhost:4200'}));
// server.listen(3003,()=>{
//     console.log('Server started at port: 3003')
// })

// CRUD operations