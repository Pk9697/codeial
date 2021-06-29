const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');

const User=require('../models/user');

//we need to tell passport to use our googleStrategy
//tell passport to use a new strategy for google login
passport.use(new googleStrategy({//passing object of googleStrategy
    clientID: "487155672086-ch9bujqsptrus9q8b05t0169e54obsu6.apps.googleusercontent.com",
    clientSecret: "NDIutdRv-1oSQB3WlkiHMVNh",
    callbackURL: "http://localhost:5000/users/auth/google/callback",
    },
    function(accessToken, refreshToken , profile ,done){
        //find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log('error in google strategy-passport',err);
                return;
            }
            // console.log(accessToken);
            // console.log(refreshToken);
            // console.log(profile);
            if(user){
                // if found, {set this user as req.user}->(means sign in that user)
                return done(null,user);
            }else{//sign up(create) the user if user not found and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')  //setting random password using crypto library
                }, function(err,user){
                    if(err){
                        console.log('error in creating user in google strategy-passport',err);
                        return;
                    }
                    return done(null,user);
                });
            }

        });
    }

));

module.exports=passport;