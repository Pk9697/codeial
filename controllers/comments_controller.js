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