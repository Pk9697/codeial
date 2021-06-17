const db=require('../config/mongoose');
const User=require('../models/user');
const Post=require('../models/post');
//no change keep it same as before cos there is no nesting here only callback fxns
module.exports.profile=function(request,response){
    //return response.end('<h1>User Profile</h1>');
    User.findById(request.params.id,function(err,user){
        return response.render('user_profile',{
            title:"User Profile",
            profile_user: user
        });
    });
    /*return response.render('user_profile',{
        title:"User Profile"
        
    });*/
}//now this controller is ready to be accessed by the router

module.exports.update=function(request,response){
    if(request.user.id == request.params.id){ //only update by the logged in user 
        User.findByIdAndUpdate(request.params.id, request.body,function(err, user){//update that user with request.body which is coming from form 
            return response.redirect('back');
        });
    }else{
        //if someone is trying to fiddle 
        return response.status(401).send('Unauthorized');
    }
}


module.exports.posts=function(request,response){
    return response.end('<h1>User Posts</h1>');
    //console.log(request.body);
}
//const userSingUp=require('../views/user_sign_up');
module.exports.signUp=function(request,response){

    if (request.isAuthenticated()){
        return response.redirect('/users/profile');//will load profile page when user is signed in and he is trying to go to sign-up page
    }
    return response.render('user_sign_up',{
        title:"Codeial | Sign Up"
    });
}

module.exports.signIn=function(request,response){
    if (request.isAuthenticated()){
        return response.redirect('/users/profile');//will load profile page when user is signed in and he is trying to go to sign-in page
    }
    return response.render('user_sign_in',{
        title:"Codeial | Sign In"
    });
}

//get the sign up data
module.exports.create=function(request,response){
    if(request.body.password!=request.body.confirm_password){
        return response.redirect('back');
    }
    console.log(request.body);
    User.findOne({email: request.body.email},function(err,user){
        if(err){
            console.log('error in finding user in signing up');
            return;
        }
        if(!user){
            User.create(request.body,function(err,user){
                if(err){
                    console.log('error in creating user while signing up');
                    return;
                }

                return response.redirect('/users/sign-in');
            });
        }
        else{
            console.log("user already existing");
            return response.redirect('back'); 
        }
    });


}
//sign in and create a session for the user
module.exports.createSession=function(request,response){
    request.flash('success', 'Logged in Successfully');
    return response.redirect('/');
    
}

module.exports.destroySession=function(request,response){
    request.logout();
    request.flash('success', 'You have logged out'); //to pass on these messages to ejs template we created middleware which fetches everything from the request flash and puts it into locals.flash and finally we used it just below flash() middleware in index.js
    return response.redirect('/');
}