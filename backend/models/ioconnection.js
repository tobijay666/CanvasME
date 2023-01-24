// // const io = require('socket.io');

// // var create = io.model('create',{
    
// // })

// // module.exports = {create};
// var socket = require('socket.io');
// var io = socket(server,{
//     cors: {
//       origin: "http://localhost:4200",
//       methods: ["GET", "POST"],
//       credentials: true,
//     },
//   });

// io.sockets.on('connection',(socket)=>{
//     console.log('newConnection' + socket.id);

//     socket.on(connection.create, function(data){
//         io.socket.emit('connection.create',data);
//     });

//     socket.on('chat', chatMessage);

//     function chatMessage(data){
//       socket.broadcast.emit('chat',data); // send to every one except me
//       // io.sockets.emit('mouse',data); Globally sending message including me
//       console.log(data);
//   }
//     // listen to chat
//     // socket.on('chat', function(data){
      
//       // io.socket.emit('chat',data);
//     // });

//     socket.on('mouse', mouseMessage);

//     function mouseMessage(data){
//         socket.broadcast.emit('mouse',data); // send to every one except me
//         // io.sockets.emit('mouse',data); Globally sending message including me
//         console.log(data);
//     }

// })