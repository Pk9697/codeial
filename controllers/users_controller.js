const db=require('../config/mongoose');
const User=require('../models/user');

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
    //Todo later
    
}