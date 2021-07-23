//earlier we called the callback fxn for app.get routes as controller which is only 1 action
//a group of actions is called a controller
const { localsName } = require('ejs');
const Post=require('../models/post');
const User=require('../models/user');
const passport=require('passport');
const Chat=require('../models/chat');
module.exports.home= async function(request,response){
    
    //Populate the user of each post(whole user object is populated for that userid)

    //writing cleaner code using async await
    try{
        //CHANGE:: populate the likes of each post and comment
        let posts=await Post.find({})//1st this completes
        .sort('-createdAt')//to display posts which are created recent at first
        .populate('user')//from postSchema
        .populate({//populating for comments
            path: 'comments',
            populate:{
                path: 'user'//users who commented
            },
            populate: {
                path: 'likes'//all the likes of comment
            }

        }).populate('likes');//populating for posts-all the likes of posts
    
        let users=await User.find({})
        .sort('-createdAt')
        .populate({
                path: 'friendships',
                populate:{
                    path: 'to_user'
                }
            });
            // console.log('assetpath:',process.env.ASSET_PATH);
        //console.log(users[0]);
        
        
        //console.log(users[0].friendships[0].from_user);
        
        // let loggedinuserp;
        // if(passport.checkAuthentication){
        //     loggedinuserp=await User.find(request.user._id)
        //     .populate({
        //     path: 'friendships',
        //     populate:{
        //         path: 'to_user'
        //     }
        //  });
        // }
        
        //console.log(request.user._id);

        //console.log(loggedinuserp[0].friendships[0].to_user.name);
        //console.log(loggedinuserp);

        let chats=await Chat.find({})
        .populate('user');

        // console.log(chats);
        //console.log('process:',process.env);
        return response.render('home',{//then at last this
            title:"Home",
            posts:posts, //passing every posts from db to home.ejs
            all_users:users, //sending all the users from user db
            //loggedinuserp:loggedinuserp
            all_chats:chats
        });
    }catch(err){ 
        console.log('Error',err);
        return;
    }
    
}

