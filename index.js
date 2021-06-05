const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=5000;
// used for session cookie
const session = require('express-session');//ctrl+space for autocomplete options
const passport= require('passport');
const passportLocal=require('./config/passport-local-strategy');

app.use(express.urlencoded());

app.use(cookieParser());
//use express router before the server starts that is why we use middlewares here
//app.use('/',require('./routes'));//middleware is used to load routes from path ./routes folder
//by default fetches index.js so no need to give path ./routes/index

app.set('view engine','ejs');//setting ejs view engine 
//setting the folder where views folder will be located
app.set('views','./views');//./views is the path where html files will be located instead of path.join

app.use(session({
    name: 'codeial',
    //TODO change the secret before deployment in production mode
    secret: 'blahsomething', //uses this secret key to encrypt cookie
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000*60*100)  //max time cookie will be present
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/',require('./routes'));//order matters so routes should be after passport.session

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);//backtics `` situated just left of key 1 -this is called interpolation where we embed our variables inside the string
    }
    console.log(`Server is running on port: ${port}`);
});