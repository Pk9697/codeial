const Like=require('../models/like');
const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.toggleLike=async function(request,response){
    try{
        
        //likes/toggle/?id=abcdef&type=Post   //here id can be post or comment and type too
        let likeable;
        let deleted=false;

        if(request.query.type=='Post'){
            likeable=await Post.findById(request.query.id).populate('likes');//if post contains other likes or not we populate likes array from post
        }else{
            likeable=await Comment.findById(request.query.id).populate('likes');
        }
        
 
        //check if a like already exists
        let existingLike=await Like.findOne({//only need to find one like if already exists using these 3 props
            likeable: request.query.id,//?set likeSchema properties
            onModel: request.query.type,
            user: request.user._id
        });
        //if a like already exists then delete it 
        if(existingLike){
            //pull out likes from likes array reference from Post and Comment
            likeable.likes.pull(existingLike._id);
            likeable.save();
            //removing it from Likes db 
            existingLike.remove();
            deleted=true;

        }else{
            //else make a new like
            let newLike=await Like.create({
                user:request.user._id,
                likeable: request.query.id,
                onModel: request.query.type
            });

            likeable.likes.push(newLike._id);
            likeable.save();
        }

        return response.json(200,{
            message:"Request successful!",
            data:{
                deleted: deleted
            }
        });




    }catch(err){
        console.log(err);
        return response.json(500,{
            message:"Internal server error"
        });
    }
}