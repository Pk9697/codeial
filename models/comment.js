const mongoose=require('mongoose');
const commentSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    //comment belongs to a user
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },
    likes:[//reference to like Model for faster query when looking for comments likes instead of searching comment id in like db
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]

},{
    timestamps:true
});

const Comment=mongoose.model('Comment',commentSchema);
module.exports=Comment;