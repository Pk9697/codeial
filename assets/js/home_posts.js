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
                    console.log(data);
                    let newPost=newPostDom(data.data.post);
                    $('#posts-div-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));//fetching deletelink inside newPost with class delete-button
                    // like($(' .like-btn', newPost),$(' .count-tag', newPost));
                    // call the create comment class
                    new PostComments(data.data.post._id);

                    // CHANGE:: enable the functionality of the toggle like button on the new post
                    new ToggleLike($(' .toggle-like-button', newPost));

                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
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

                        <br>

                        <small>
                            <!-- Whenever adding post dynamically its hould show 0 likes-- obviously-->
                            <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                                0 Likes 
                            </a>
                        </small>

                    </p>
                    <!--<p class="count-tag">10</p>
                    <button type="button" class="like-btn btn btn-primary" style="background-color: red;">Like</button>-->
    
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
                    console.log(data);
                    $(`#post-${data.data.post_id}`).remove();//will remove the post from list of posts having id post_id from _post.ejs

                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error:function(error){
                    console.log(error.responseText);
                }
            });
        });

        
    }
    // let flag=0;
    // let like=function(likeBtn,countTag){
    //         $(likeBtn).click(function(e){
    //         // let countTag=$('.count-tag');
            
    //         countTag.text(function(i,origText){
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
    

     // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-div-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);
            // let likeBtn=$(' .like-btn',self);
            // let countTag=$(' .count-tag',self);
            // like(likeBtn,countTag);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1];
            new PostComments(postId);
        });
    }

    createPost();
    convertPostsToAjax();

    // console.log("inside home posts js");
    // let flag=0;
    // $('#like-btn').click(function(){
    //     let countTag=$('#count-tag');
        
    //     countTag.text(function(i,origText){
    //         //let value=parseInt(origText);
    //         if(flag==0){
    //             flag=1;
    //             return parseInt(origText)+1;
    //         }else{
    //             flag=0;
    //             return parseInt(origText)-1;
    //         }
            
            
    //     });
        
    // });
    
}