const Post=require('../models/post');
const Comment=require('../models/comment')
module.exports.create=function(request,response){
    Post.create({
        content: request.body.content,
        user: request.user._id //from locals.user in passport-local will save the current logged in user who is posting
    },function(err,post){
        if(err){
            console.log("error in creating a post");
            return;
        }
        return response.redirect('back');
    });
}

module.exports.destroy=function(request,response){
    Post.findById(request.params.id,function(err,post){
        //.id means converting the object id into string
        if(post.user == request.user.id){//authorization if the delete request is from the same person who created it or not
            post.remove();
            //deleteMany is the fxn which deleted all the comments based on some query past
            Comment.deleteMany({post: request.params.id}, function(err){//delete comments with post having that post id
                return response.redirect('back');
            });

        }else{
            return response.redirect('back');
        }
    });
}