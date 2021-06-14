const Comment= require('../models/comment');
const Post=require('../models/post');
module.exports.create=function(request,response){
    Post.findById(request.body.post,function(err,post){//we first find in the Post index from form data with name post
        if(post){//if post exists then only create comment
            Comment.create({
                content: request.body.content,
                post: request.body.post,
                user: request.user._id
            },function(err,comment){
                //handle error

                //adding comments in the comments array to the Post schema
                post.comments.push(comment);//updating post schema
                post.save();//then saving

                response.redirect('/');
            });
        }
    });
}

module.exports.destroy=function(request,response){
    Comment.findById(request.params.id,function(err,comment){
        if(comment.user==request.user.id){//only that user will delete who created it
            //now we can't just delete comments from comments db but also from post db cos we created an array of comments objectid for each post 
            //so we need to also find that post where comment is created then go inside that post and delete that comment from that comments array
            let postId=comment.post;

            comment.remove();
            //$pull is the mongodb syntax to remove from db
            Post.findByIdAndUpdate(postId, {$pull: {comments: request.params.id}}, function(err,post){
                return response.redirect('back');
            });
            
        }else{
            return response.redirect('back');
        }
    });
}