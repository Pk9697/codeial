{
    //method to submit form data for new post using ajax
    let createPost=function(){
        let newPostForm=$('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();//nothing happens when post button is clicked
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),// converts from data into json in key value pair
                success: function(data){
                    //console.log(data);
                    let newPost=newPostDom(data.data.post);
                    $('#posts-div-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));//fetching deletelink inside newPost with class delete-button
                
                    // call the create comment class
                    new PostComments(data.data.post._id);

                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    //method to create a post in dom

    let newPostDom=function(post){
        return $(`<li id="post-${post._id}">
                    <p>
                        
                        <small>
                            <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                        </small>
                        
                        ${post.content} 
                        <br>
                        <small><!--Showing the author-->
                            ${ post.user.name }
                        </small>
                    </p>
    
                    <div class="post-comments">
                    
                            <form id="post-${ post._id }-comments-form" action="/comments/create" method="POST">
                                <input type="text" name="content" placeholder="Type here to add comment..." required>
                                <input type="hidden" name="post" value="${ post._id }"> <!--postid will be sent with form data which will be processed in comments-controller-->
                                <input type="submit" value="Add Comment">
                            </form>
                   
    
                        <div class="post-comments-list">
                            <ul id="post-comments-${ post._id }">
                                
                            </ul>
                        </div>
                    </div>
        
                  </li>
                `);
    }

    //method to delete a post from DOM
    let deletePost=function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),//.prop gets the value of href from delete a tag
                success:function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },error:function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    var postId;

     // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-div-container>ul>li').each(function(){
            let self = $(this);
            //let deleteButton = $(' .delete-post-button', self);
            //deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            postId = self.prop('id').split("-")[1];
            new PostComments(postId);
        });
    }

    createPost();
    convertPostsToAjax();
    //PostComments(postId);
}