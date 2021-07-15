 const User=require('../models/user');
 const Friendship=require('../models/friendship');
 module.exports.friends=async function(request,response){
    //console.log('Inside friends controller');
    try{
        // friends/toggle/?from=abcdef&to=pqrst
        let added=false;
        let from_user=await User.findById(request.query.from).populate('friendships');
        let to_user=await User.findById(request.query.to).populate('friendships');


        let existingFriendRequest=await Friendship.findOne({
            from_user: request.query.from,
            to_user: request.query.to
        })

        if(!existingFriendRequest){
            let newFriendReq=await Friendship.create({
                from_user: request.query.from,
                to_user: request.query.to
            });

            from_user.friendships.push(newFriendReq._id);
            from_user.save();
            // to_user.friendships.push(newFriendReq._id);
            // to_user.save();
            added=true;
        }else{
            from_user.friendships.pull(existingFriendRequest._id);
            from_user.save();
            // to_user.friendships.pull(existingFriendRequest._id);        
            // to_user.save();
 
            existingFriendRequest.remove();
            
        }
        return response.status(200).json({
            message: "Request successful!",
            data: {
                added: added
            }
        })

    }catch(err){
        console.log(err);
        return res.status(500).json( {
            message: 'Internal Server Error'
        });
    }
   //  console.log(request.query);
   //  return response.end('controller loaded');

 }