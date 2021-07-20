//chat_engine here will be communicating from the client side on the browser whereas chat_sockets.js is the one which is going to be the observer or server which is going to receive the upcoming connections from all the users which are the subscribers
class ChatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBox=$(`#${chatBoxId}`);
        this.userEmail=userEmail;
        //this io.connect fires a connection event in chat_sockets in config
        //*1
        this.socket=io.connect('http://localhost:4000');//! i emit a connect event //1

        if(this.userEmail){//if useremail exists for a user then only call connectionhandler
            this.connectionHandler();
        }
    }
    //this connection handler will have to and fro interaction bw observer and subscriber
    //*3
    connectionHandler(){ //! acknowledgement is emitted back from chat sockets that you are connected with connect event
        let self=this;
        this.socket.on('connect',function(){//on event on connect 
            console.log('connection established using sockets');

            self.socket.emit('join_room',{//join_room event with parameters as subscriber email and chatroom name as codeial
                user_email: self.userEmail,
                chatroom:'codeial'
            });

            self.socket.on("user_joined",function(data){
                console.log("a user joined:", data);
            })
        })
    }
}