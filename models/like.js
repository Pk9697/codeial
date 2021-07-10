const mongoose=require('mongoose');

const likeSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,

    },
    //this defines the object id of the liked object
    likeable:{
        type:mongoose.Schema.ObjectId,
        require:true,
        refPath: 'onModel' //refpath decides which other property that is type of object

    },
    // a likeable can be a post or a comment
    //this field is used for defining the type of the liked object(Post or Comment) since this is a dynamic reference 
    onModel:{
        type: String,
        required: true,
        enum:['Post','Comment']//tells that value of onModel on each like can be either post or comment nothing other than these
    }
},{
    timestamps:true
});

const Like=mongoose.model('Like',likeSchema);
module.exports=Like;