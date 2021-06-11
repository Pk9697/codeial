const mongoose=require('mongoose');
const postSchema= new mongoose.Schema({
    content:{
        type:String,
        required: true,
    },
    user: { //to link postSchema with userSchema
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' //refernce from User Schema
    }
},{
    timestamps:true
});

const Post=mongoose.model('Post',postSchema);
module.exports=Post;