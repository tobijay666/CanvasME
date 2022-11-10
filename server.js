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
    
    // console.log(socket);
}