const Post=require('../../../models/post');
const Comment=require('../../../models/comment');
module.exports.index=async function(request,response){

    let posts=await Post.find({})//1st this completes
        .sort('-createdAt')//to display posts which are created recent at first
        .populate('user')//from postSchema
        .populate({
            path: 'comments',
            populate:{
                path: 'user'//users who commented
            }
        });



    //send json data
    // deprecated
    // return response.json(200, {
    //     message:"List of posts of v1",
    //     posts: []
    // });
    //updated
    return response.status(200).json({
        message:"List of posts of v1",
        posts: posts
    });


}


 
module.exports.destroy=async function(request,response){
    //.id means converting the object id into string

   try{
       let post=await Post.findById(request.params.id);

        if(post.user == request.user.id){//authorization if the delete request is from the same person who created it or not
           post.remove();
       //deleteMany is the fxn which deleted all the comments based on some query past
           await Comment.deleteMany({post: request.params.id});//delete comments with post having that post id
           
        return response.status(200).json({
            message:"Post and associated comments deleted successfully"
        });

       }else{
            return response.status(401).json({
            message:"You cannot delete this post"
            });
       }
   }catch(err){
       //console.log('Error',err);
    //    request.flash('error',err);
    //    return response.redirect('back'); 
        return response.status(500).json({
            message:"Internal Server error"
        });
   }
   
}