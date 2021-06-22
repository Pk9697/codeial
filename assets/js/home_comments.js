{
    let createComment=function(){
        let newCommentForm=$('#new-comments-form');
        newCommentForm.submit(function(e){
            e.preventDefault();
        });
    }

    createComment();
}