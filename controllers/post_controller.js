const Post=require('../models/post');
const Comment=require('../models/comment')
module.exports.create=async function(request,response){
    try{
        let post=await Post.create({
            content: request.body.content,
            user: request.user._id //from locals.user in passport-local will save the current logged in user who is posting
        });

        if(request.xhr){//xhr request is coming from ajax request
            return response.status(200).json({
                data:{
                    post:post //sending the post which was created back to ajax
                },
                message: "Post created!"
            });
        }
        request.flash('success','Post published!');
        return response.redirect('back');
    }catch(err){
        //console.log('Error',err);
        request.flash('error',err);
        return response.redirect('back'); 
    }
    
}

module.exports.destroy=async function(request,response){
     //.id means converting the object id into string

    try{
        let post=await Post.findById(request.params.id);

        if(post.user == request.user.id){//authorization if the delete request is from the same person who created it or not
            post.remove();
        //deleteMany is the fxn which deleted all the comments based on some query past
            await Comment.deleteMany({post: request.params.id});//delete comments with post having that post id
            
            if(request.xhr){
                return response.status(200).json({
                    data: {
                        post_id : request.params.id
                    },
                    message: "Post deleted!"
                });
            }
            request.flash('success','Post and associated comments deleted!');
            return response.redirect('back');

        }else{
            request.flash('error','You cannot delete this post');
            return response.redirect('back');
        }
    }catch(err){
        //console.log('Error',err);
        request.flash('error',err);
        return response.redirect('back'); 
    }
    
}