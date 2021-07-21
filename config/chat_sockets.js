//chat_engine here will be communicating from the client side on the browser whereas chat_sockets.js is the one which is going to be the observer or server which is going to receive the upcoming connections from all the users which are the subscribers
module.exports.chatSockets = function(socketServer){
    // let io=require('socket.io')(socketServer);
    
// const io = require("socket.io")(socketServer, {
//     cors: {
//       origin: "http://localhost:5000",
//       methods: ["GET", "POST"]
//     }
//   });
    const io = require("socket.io")(socketServer, {
        cors:{//important upgrade
            origin: "*"
        }
    });

    //connection event is fired from chat_engine io.connect
    //*2
    io.sockets.on('connection', function(socket){//! this receives a connection and this emits back the acknowledgement to chat_engine connectionhandler 
        console.log('new connection received', socket.id);

        socket.on("disconnect",function(){//* working with ""
            console.log('socket disconnected!', socket.id);

        });
        //on event join_room execute call back fxn
        socket.on("join_room",function(data){
            console.log('joining request received :',data);
            //when joining request has been received join that socket to room
            socket.join(data.chatroom);//join the user in chat room
            //when i join the chatroom everyone including me should receive notification that i joined the chatroom
            io.in(data.chatroom).emit('user_joined',data);//emitting 'user_joined' event from server to every other subscriber
        });
        //CHANGE:: detect send_message and broadcast to everyone in the room
        socket.on('send_message',function(data){
            io.in(data.chatroom).emit('receive_message',data);
        })
    }); 
}