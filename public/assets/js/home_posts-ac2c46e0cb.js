{let t=function(){let t=$("#new-post-form");t.submit((function(o){o.preventDefault(),$.ajax({type:"post",url:"/posts/create",data:t.serialize(),success:function(t){console.log(t);let o=e(t.data.post);$("#posts-div-container>ul").prepend(o),n($(" .delete-post-button",o)),new PostComments(t.data.post._id),new ToggleLike($(" .toggle-like-button",o)),new Noty({theme:"relax",text:"Post published!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(t){console.log(t.responseText)}})}))},e=function(t){return $(`<li id="post-${t._id}">\n                    <p>\n                        \n                        <small>\n                            <a class="delete-post-button" href="/posts/destroy/${t._id}">X</a>\n                        </small>\n                        \n                        ${t.content} \n                        <br>\n                        <small>\x3c!--Showing the author--\x3e\n                            ${t.user.name}\n                        </small>\n\n                        <br>\n\n                        <small>\n                            \x3c!-- Whenever adding post dynamically its hould show 0 likes-- obviously--\x3e\n                            <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${t._id}&type=Post">\n                                0 Likes \n                            </a>\n                        </small>\n\n                    </p>\n                    \x3c!--<p class="count-tag">10</p>\n                    <button type="button" class="like-btn btn btn-primary" style="background-color: red;">Like</button>--\x3e\n    \n                    <div class="post-comments">\n                    \n                            <form id="post-${t._id}-comments-form" action="/comments/create" method="POST">\n                                <input type="text" name="content" placeholder="Type here to add comment..." required>\n                                <input type="hidden" name="post" value="${t._id}"> \x3c!--postid will be sent with form data which will be processed in comments-controller--\x3e\n                                <input type="submit" value="Add Comment">\n                            </form>\n                   \n    \n                        <div class="post-comments-list">\n                            <ul id="post-comments-${t._id}">\n                                \n                            </ul>\n                        </div>\n                    </div>\n        \n                  </li>\n                `)},n=function(t){$(t).click((function(e){e.preventDefault(),$.ajax({type:"get",url:$(t).prop("href"),success:function(t){console.log(t),$("#post-"+t.data.post_id).remove(),new Noty({theme:"relax",text:"Post Deleted",type:"success",layout:"topRight",timeout:1500}).show()},error:function(t){console.log(t.responseText)}})}))},o=function(){$("#posts-div-container>ul>li").each((function(){let t=$(this),e=$(" .delete-post-button",t);n(e);let o=t.prop("id").split("-")[1];new PostComments(o)}))};t(),o()}