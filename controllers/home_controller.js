//earlier we called the callback fxn for app.get routes as controller which is only 1 action
//a group of actions is called a controller
const Post=require('../models/post');
module.exports.home=function(request,response){//now we need to access this fxn in routes
    //return response.end('<h1>Express is up for Codeial</h1>')
    //console.log(request.cookies);//cookies set up in browser so coming as a request
    //response.cookie('user_id',25);//changing cookies from server side using response
    /*Post.find({},function(err,posts){// finds all the created post in db
        return response.render('home',{
            title:"Home",
            posts:posts //passing every posts from db to home.ejs
         });
    });*/
    //Populate the user of each post(whole user object is populated for that userid)
    Post.find({}).populate('user').exec(function(err,posts){
        return response.render('home',{
            title:"Home",
            posts:posts //passing every posts from db to home.ejs
         });
    });

    /*return response.render('home',{
       title:"Home" 
    });*/
}

