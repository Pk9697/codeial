let friendsBtn=$("#friendsBtn");
let friendptag=$(".friendptag");
console.log('toggle_friends.js loaded'); 
friendsBtn.click(function(e){
    
    e.preventDefault();
    console.log('clicked');
    $.ajax({
        type:'POST',
        url: friendsBtn.attr('href'),
    })
    .done(function(data){
        console.log(data);
        console.log(friendsBtn.text());
        if(data.data.added==true){
            friendsBtn.html("<b>Remove<b>");
            friendptag.html("<b>Is a friend</b>");
        }else{
            friendsBtn.html("<b>Add<b>");
            friendptag.html("<b>Is not a friend</b>");

        }
    })
    .fail(function(errData) {
        console.log('error in completing the request');
    });
});