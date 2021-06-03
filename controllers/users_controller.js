module.exports.profile=function(request,response){
    return response.end('<h1>User Profile</h1>');
}//now this controller is ready to be accessed by the router

module.exports.posts=function(request,response){
    return response.end('<h1>User Posts</h1>');
}
//const userSingUp=require('../views/user_sign_up');
module.exports.signUp=function(request,response){
    return response.render('user_sign_up',{
        title:"Codeial | Sign Up"
    });
}

module.exports.signIn=function(request,response){
    return response.render('user_sign_in',{
        title:"Codeial | Sign In"
    });
}

//get the sign up data
module.exports.create=function(request,response){
    //Todo later
}
//sign in and create a session for the user
module.exports.createSession=function(request,response){
    //Todo later
}