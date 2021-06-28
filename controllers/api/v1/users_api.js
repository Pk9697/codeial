const User=require('../../../models/user');
const jwt=require('jsonwebtoken');

//sign in and create a session for the user
module.exports.createSession=async function(request,response){
    try{
        let user=await User.findOne({email: request.body.email});
        if(!user || user.password!=request.body.password){
            return response.status(422).json({
                message:"Invalid Username or password"
            });
        }
        return response.status(200).json({
            message:"Sign in successful,here is your token, please keep it safe!",
            data:{
                //converting user to json with key codeial and expiry and passing it to jwt.sign which is going to return token                
                token: jwt.sign(user.toJSON(),'codeial',{expiresIn: '10000'}) //passing on the token using jwt library
            }
        });
        
    }catch(err){
        console.log('Error',err);
        return response.status(500).json({
            message:"Internal Server error"
        });
    }
    
}
