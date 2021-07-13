/*{  
    let createComment=function(){
        let newCommentForm=$('#new-comments-form');
        newCommentForm.submit(function(e){
            e.preventDefault();
        });
    }

    createComment();
  
}*/

    // Let's implement this via classes 

    // this class would be initialized for every post on the page
    // 1. When the page loads
    // 2. Creation of every post dynamically via AJAX
class PostComments{
    constructor(postId){
        this.postId=postId;
        this.postContainer=$(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);
        
        let self=this;
        // let like;
        // let count;
        // call for all the existing comments
        $(' .delete-comment-button', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
        // $(' .like-btn-comment', this.postContainer),$(' .count-tag-comment', this.postContainer).each(function(){
        //     self.likeComment($(this),$(this));
        // });
    
        // $(' .like-btn-comment, .count-tag-comment', this.postContainer).each(function(){
        //     self.likeComment($(this),$(this));
        // });
        // $(' .like-btn-comment', this.postContainer).each(function(){
            
        //     self.likeComment($(this));
        // });
        // $(' .count-tag-comment', this.postContainer).each(function(){
        //     count=$(this);
                
        // });
        // self.likeComment(like,count);
        // $(' .count-tag-comment', this.postContainer).each(function(){
        //     count=$(this);
        // });
        // self.likeComment(like,count);
        // 



    }


    createComment(postId){
        let pSelf=this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let self=this;


            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function(data){
                    console.log(data);
                    let newComment=pSelf.newCommentDom(data.data.comment);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    pSelf.deleteComment($(' .delete-comment-button', newComment));
                    //pSelf.likeComment($(' .like-btn-comment', newComment),$(' .count-tag-comment', newComment));
                    // pSelf.likeComment($(' .like-btn-comment', newComment));

                    // CHANGE:: enable the functionality of the toggle like button on the new comment
                    new ToggleLike($(' .toggle-like-button', newComment));

                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }

    newCommentDom(comment){
        return $(`<li id="comment-${ comment._id }">
        <p>
            
            <small>
                <a class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
            </small>
            
            ${comment.content}
            <br>
            <small>
                ${comment.user.name}
            </small>
            <br>
            <small>
                <!-- Whenever adding post dynamically its hould show 0 likes-- obviously-->
                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment">
                    0 Likes 
                </a>
            </small>
        </p>
        <!--<p class="count-tag-comment">10</p>
        <button type="button" class="like-btn-comment btn btn-primary" style="background-color: aqua;">100</button>-->    

        </li>`);
    }
    
    // likeComment(likeBtn,flag=0){
    //     $(likeBtn).click(function(e){
    //         // let countTag=$('.count-tag');
            
    //         likeBtn.text(function(i,origText){
    //         //let value=parseInt(origText);
    //         if(flag==0){
    //             flag=1;
    //             return parseInt(origText)+1;
    //         }else{
    //             flag=0;
    //             return parseInt(origText)-1;
    //         }
               
    //         });
    //         });
    // }



    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });



        });
    }
}
