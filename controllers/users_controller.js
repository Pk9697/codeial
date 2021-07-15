const db=require('../config/mongoose');
const User=require('../models/user');
const Post=require('../models/post');
const Friendship=require('../models/friendship');
const fs=require('fs');
const path=require('path');
//no change keep it same as before cos there is no nesting here only callback fxns
module.exports.profile=async function(request,response){
    //return response.end('<h1>User Profile</h1>');
    // let friendship=await Friendship.findById({
    //     from_user: request.user._id,
    //     // to_user: request.params.id
    // });
    //let friendship=await Friendship.findById(request.user._id,request.params.id);
    try{
        console.log(request.user._id);
        console.log(request.params.id);
    let loggedinuser=await User.findById(request.user._id)
    .populate({
        path: 'friendships',
        populate:{
            path: 'to_user'
        }
    });

    console.log(loggedinuser.friendships.length);
    let user=await User.findById(request.params.id);
    //console.log(user);
    return response.render('user_profile',{
        title:"User Profile",
        profile_user: user,
        loggedinuser:loggedinuser

    });

    }catch(err){ 
        console.log('Error',err);
        return;
    }
    


    /*return response.render('user_profile',{
        title:"User Profile"
        
    });*/
}//now this controller is ready to be accessed by the router

module.exports.update=async function(request,response){
    /*if(request.user.id == request.params.id){ //only update by the logged in user 
        User.findByIdAndUpdate(request.params.id, request.body,function(err, user){//update that user with request.body which is coming from form 
            request.flash('success','Profile Updated!');
            return response.redirect('back');
        });
    }else{
        //if someone is trying to fiddle 
        request.flash('error','You cannot update someone else profile');
        return response.status(401).send('Unauthorized');
    }*/
    if(request.user.id == request.params.id){ 
        try{
            let user=await User.findById(request.params.id);
            User.uploadedAvatar(request,response,function(err){//only multer can access enctype="multipart/form-data"-- request.body would not have accessed enctype="multipart/form-data" without multer
                if(err){
                    console.log('******Multer error:',err);
                }
                //console.log(request.file);
                user.name=request.body.name;
                user.email=request.body.email;

                if(request.file){
                    
                    if(user.avatar){
                        //if avatar already exists for that user and he is trying to update his pic then we delete previous image
                        /*const pathFile = path.join(__dirname,'..',user.avatar);

                        fs.access(pathFile, fs.F_OK, (err) => {
                            if (err) {
                                console.error(err);
                                return;
                            };
                            console.log("path exists",pathFile);
                            //file exists
                            fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                        });

                        const folderName=path.join(__dirname,'..',User.avatarPath);
                        console.log(folderName);
                        fs.readdir(folderName, function(err, files) {
                            if (err) {
                               // some sort of error
                               console.log(err);
                            } else {
                                console.log(files.length);
                               if (files.length==0) {
                                   // directory appears to be empty 
                                   console.log("empty");
                               } else {
                                  // directory appears to not be empty so send email for not empty
                                  console.log("present");
                                  fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                                }
                            }
                        });*/
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                        
                    }
                    
                    //if user uploads a file then store in user schema for user.avatar= 
                    //saving the path of the uploaded file into the avatar field in the user
                    user.avatar=User.avatarPath+'/'+request.file.filename;//user.avatar='uploads/users/avatar/avatar-1624623866554'

                    
                }
                user.save();
                return response.redirect('back');

            });
        }catch(err){
            request.flash('error',err);
            return response.redirect('back'); 
        }
    }else{
        request.flash('error','You cannot update someone else profile');
        return response.status(401).send('Unauthorized');
    }   

}


/*module.exports.posts=function(request,response){
    return response.end('<h1>User Posts</h1>');
    //console.log(request.body);
}*/
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