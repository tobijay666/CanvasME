var express = require('express');

var app = express();
var server = app.listen(3000);

app.use(express.static('Public'));

console.log("My socket server!");

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket){
    console.log('new connection:'+ socket.id);  
}