const User=require('../models/user');
const Chat=require('../models/chat');

module.exports.create=async function(request,response){

    try{
        let chat=await Chat.create({
            content: request.body.content,
            user: request.user._id
        });
        //console.log(request.body);
        // console.log(chat);
        chat=await chat.populate('user').execPopulate();
        console.log(chat);
        if(request.xhr){
            return response.status(200).json({
                message: "Chat created!",
                data: {
                    chat: chat
                }
            })
        }
        
        request.flash('success','Chat created!');
        return response.redirect('back');


    }catch(err){
        console.log(err);
        return response.status(500).json( {
            message: 'Internal Server Error'
        });
    }


}