const passport=require('passport');
const JWTStrategy=require('passport-jwt').Strategy;
const ExtractJWT=require('passport-jwt').ExtractJwt;

const User=require('../models/user');//used to find user from db whenever request comes in and header contains jwt
const env=require('./environment');

let options={
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwt_secret
}

passport.use(new JWTStrategy(options,function(jwtPayload,done){//jwtPayload contains info of the user
    
    User.findById(jwtPayload._id, function(err,user){//finding user from db using jwtPayload id which we will get whenever request comes in and header contains jwt
        if(err){
            console.log("Error in finding user from jwt");
            return;
        }

        if(user){
            return done(null,user);
        }else{
            return done(null,false);//false means user was not found
        }
    })
}));

module.exports=passport;