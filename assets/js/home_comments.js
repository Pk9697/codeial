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
                    //console.log(data);
                    let newComment=pSelf.newCommentDom(data.data.comment);
                    $(`#post-comments-${postId}`).prepend(newComment);
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
        </p>    

        </li>`);
    }
}