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

        //CHANGE:: send a message on clicking the send message button
        // $('#send-button').click(function(){
        //     let msg=$('#chat-message-input').val();
        //     if(msg!=''){
        //         self.socket.emit('send_message', {
        //             message:msg,
        //             user_email:self.userEmail,
        //             chatroom:'codeial'
        //         });
        //     }
        // });

        let newChatform=$('#chat-message-input-container');
        newChatform.submit(function(e){
            e.preventDefault();
            let msg=$('#chat-message-input').val();
            if(msg!=''){
                $.ajax({
                    type:'post',
                    url: '/chats/create',
                    data: newChatform.serialize(),
                    success: function(data){
                        // console.log(data.data.chat.user.email);
                        // console.log(data.data.chat.content);
                        self.socket.emit('send_message', {
                            message:data.data.chat.content,
                            user_email:self.userEmail,
                            chatroom:'codeial'
                        });
                        $('#chat-message-input').val('');//clears input area 
    
                    }, error: function(error){
                        console.log(error.responseText);
                    }
                })
            }
            
        })

        self.socket.on('receive_message',function(data){
            console.log('message received', data.message);

            let newMessage=$('<li>');//will create the list item
            //detect what is the msg type
            let messageType='other-message';
            if(data.user_email == self.userEmail){
                messageType='self-message';
            }
            newMessage.append($('<span>',{//what message is sent
                'html': data.message// append span with its html content as data.message
            }));
            newMessage.append($('<sub>',{//who sent the message
                'html': data.user_email// append subscript with its html content as data.user_email
            }));

            newMessage.addClass(messageType);//whether its self or other message

            //finally append it to ul
            $('#chat-messages-list').append(newMessage);
        });
    }
}