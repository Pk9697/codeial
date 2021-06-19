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
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    createPost();
}