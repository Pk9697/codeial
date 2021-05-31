module.exports.profile=function(request,response){
    return response.end('<h1>User Profile</h1>')
}//now this controller is ready to be accessed by the router

module.exports.posts=function(request,response){
    return response.end('<h1>User Posts</h1>')
}