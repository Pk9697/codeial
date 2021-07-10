const mongoose=require('mongoose');
const postSchema= new mongoose.Schema({
    content:{
        type:String,
        required: true,
    },
    user: { //to link postSchema with userSchema
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' //reference from User Schema
    },
    //include the array of ids of all comments in this post schema itself
    //cos in a post we would be needing to show all comments here itself
    //which would make comments load here faster than looking for comments in commentsSchema
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ],
    likes:[//reference to like Model for faster query when looking for posts likes instead of searching post id in like db
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]

},{
    timestamps:true
});

const Post=mongoose.model('Post',postSchema);
module.exports=Post;