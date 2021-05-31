//earlier we called the callback fxn for app.get routes as controller which is only 1 action
//a group of actions is called a controller
module.exports.home=function(request,response){//now we need to access this fxn in routes
    //return response.end('<h1>Express is up for Codeial</h1>')
    return response.render('home',{
       title:"Home" 
    });
}

