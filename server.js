var express = require('express');

var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

console.log("Running");


var socket = require('socket.io');
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