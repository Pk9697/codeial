module.exports.setFlash=function(request,response,next){//we created middleware which fetches everything from the request flash and puts it into locals.flash
    response.locals.flash={
        'success': request.flash('success'),
        'error': request.flash('error')
    }
    next();
}