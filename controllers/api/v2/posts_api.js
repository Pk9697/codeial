module.exports.index=function(request,response){
    //send json data
    // deprecated
    // return response.json(200, {
    //     message:"List of posts of v2",
    //     posts: []
    // });
    //updated
    return response.status(200).json({
        message:"List of posts of v2",
        posts: []
    });
}