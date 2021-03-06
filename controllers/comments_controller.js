const Comment= require('../models/comment');
const Post=require('../models/post');
const commentsMailer=require('../mailers/comments_mailer');
const queue=require('../config/kue');
const commentEmailWorker=require('../workers/comment_email_worker');
const Like=require('../models/like');

module.exports.create=async function(request,response){

    try{
        console.log(request.body);
        let post=await Post.findById(request.body.post);//we first find in the Post index from form data with name post
        
        if(post){//if post exists then only create comment
        let comment=await Comment.create({
            content: request.body.content,
            post: request.body.post,
            user: request.user._id
        });
        //adding comments in the comments array to the Post schema
        post.comments.push(comment);//updating post schema
        post.save();//then saving
        //populating user everytime
        comment = await comment.populate('user', 'name email').execPopulate();
        //commentsMailer.newComment(comment);
        let job= queue.create('emails',comment).save(function(err){
            if(err){
                console.log('error in creating a queue',err);
                return;
            }
            console.log('job enqueued',job.id);

        });
        if(request.xhr){
            // Similar for comments to fetch the user's id!
            //comment = await comment.populate('user', 'name').execPopulate();
            return response.status(200).json({
                data:{
                    comment:comment
                },
                message:"Comment created!"
            });
        }
        request.flash('success','Comment published!');
        //response.redirect('/');
        return response.redirect('back'); 
    }
    }catch(err){
        //console.log('Error',err);
        request.flash('error',err);
        return response.redirect('back'); 
    }    
    
}

module.exports.destroy=async function(request,response){

    try{
        let comment=await Comment.findById(request.params.id);

        if(comment.user==request.user.id){//only that user will delete who created it
        //now we can't just delete comments from comments db but also from post db cos we created an array of comments objectid for each post 
        //so we need to also find that post where comment is created then go inside that post and delete that comment from that comments array
        let postId=comment.post;

        comment.remove();
        //$pull is the mongodb syntax to remove from db
        let post=await Post.findByIdAndUpdate(postId, {$pull: {comments: request.params.id}});

        //CHANGE:: destroy the associated likes for this comment
        await Like.deleteMany({likeable: comment._id,onModel: 'Comment'});//!see again that after deleting comment will this work?
        
         // send the comment id which was deleted back to the views
         if (request.xhr){
            return response.status(200).json({
                data: {
                    comment_id: request.params.id
                },
                message: "Post deleted"
            });
        }
        
        
        
        request.flash('success','Comments deleted from comments as well as posts.comments array!');
        return response.redirect('back');
        
        }else{
        request.flash('error','You cannot delete this comment');
        return response.redirect('back');
        }
    }catch(err){
        //console.log('Error',err);
        request.flash('error',err);
        return;
    }
    
}