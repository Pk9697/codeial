const passport=require('passport');

const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/user');
//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'  //which we are going to make unique in userschema
    },
    function(email,password,done){//done is the callback fxn which is reporting back to passport.js
        //find a user and establish the identity
        User.findOne({email:email},function(err,user){
            if(err){
                console.log("Error in finding user --> Passport");
                return done(err);
            }

            if(!user || user.password != password){
                console.log("Invalid UserName/Password");
                return done(null,false);//passed error as null authentication as false
            }

            return done(null,user);
        });

    }

));
//once the user is found
//serializing the user to descide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);//stores user's id in encrypted format into the cookie
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){//searching cookie id for identity of which user is signed in same as manual auth where we searched for id in cookie then displaying profile page
    User.findById(id, function(err,user){
        if(err){
            console.log("Error in finding user --> Passport");
            return done(err);
        }

        return done(null,user);
    });
});

module.exports=passport;