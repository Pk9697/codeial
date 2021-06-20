//earlier we called the callback fxn for app.get routes as controller which is only 1 action
//a group of actions is called a controller
const Post=require('../models/post');
const User=require('../models/user');
module.exports.home= async function(request,response){
    
    //Populate the user of each post(whole user object is populated for that userid)

    //writing cleaner code using async await
    try{
        let posts=await Post.find({})//1st this completes
        .sort('-createdAt')//to display posts which are created recent at first
        .populate('user')//from postSchema
        .populate({
            path: 'comments',
            populate:{
                path: 'user'//users who commented
            }
        });
    
        let users=await User.find({});//2nd this

        return response.render('home',{//then at last this
            title:"Home",
            posts:posts, //passing every posts from db to home.ejs
            all_users:users //sending all the users from user db
        });
    }catch(err){
        console.log('Error',err);
        return;
    }
    
}

