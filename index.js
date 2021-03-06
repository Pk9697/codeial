const express=require('express');
const env=require('./config/environment');
const logger=require('morgan');
const cookieParser=require('cookie-parser');
const app=express();
require('./config/view-helpers')(app);

const port=5000;
const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');

// used for session cookie
const session = require('express-session');//ctrl+space for autocomplete options
const passport= require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportJWT=require('./config/passport-jwt-strategy');
const passportGoogle=require('./config/passport-google-oauth2-strategy');
const mongoose=require('mongoose');
const MongoStore = require('connect-mongo');//setting up persistent storage so that whenever server restarts it doesn't remove cookie
//const { MongoDBStore } = require('connect-mongodb-session');
const sassMiddleware= require('node-sass-middleware');
const flash=require('connect-flash');
const customMware=require('./config/middleware');//used to send request.flash in the response.redirect method in users controller

//setup the chat server to be used with socket.io
const chatServer=require('http').Server(app);
const chatSockets=require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(4000);
console.log('chat server is listening on port 4000');
const path=require('path');
// console.log('assetpath:',process.env.ASSET_PATH);
if(env.name=='development'){//*only in development phase we need sass middleware to load again and again cos we make changes on the go but not in production mode
    app.use(sassMiddleware({
        src: path.join(__dirname,env.asset_path,'scss'),  //from where do i pick up scss files to convert into css
        dest: path.join(__dirname,env.asset_path,'css'),       //where do i need to put the css files
        debug:  true,                    //debug mode is whatever info you see in the terminal while server is running //true cos we want to see if any error occurs to be displayed in terminal //false when we run it in production mode
        outputStyle: 'extended',                      // do i want everything in single line(compressed) or in multiple lines(extended)
        prefix: '/css'                            //where should my server look out for css files //just the prefix of css files in href /css/layout.css 
    }));
}



app.use(express.urlencoded({extended: false}));

app.use(cookieParser());
//use express router before the server starts that is why we use middlewares here
//app.use('/',require('./routes'));//middleware is used to load routes from path ./routes folder
//by default fetches index.js so no need to give path ./routes/index
app.use(express.static(env.asset_path));
//make the uploads path availaible to the browser
app.use('/uploads',express.static(__dirname+'/uploads'));

app.use(logger(env.morgan.mode,env.morgan.options));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine','ejs');//setting ejs view engine 
//setting the folder where views folder will be located
app.set('views','./views');//./views is the path where html files will be located instead of path.join
//mongo store is used to store the session cookie in the db
//MONGO_URL='mongodb://localhost:27017/codeial'
//console.log("Connection url => ", MONGO_URL);
app.use(session({
    name: 'codeial',
    //TODO change the secret before deployment in production mode
    secret: env.session_cookie_key, //uses this secret key to encrypt cookie
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000*60*100)  //max time cookie will be present
    },
    // old update
    // store: new MongoStore(
    //     {
    //         mongooseConnection: db,
    //         autoRemove: 'disabled'     
    //     },
    //     function(err){
    //         console.log(err ||  'connect-mongodb setup ok');
    //     }
    // )
    //new update
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/codeial_db',
            autoRemove: 'disabled' // Default is native    
        }
        
    )
    

}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);//extremely important  go to passport-local-strategy to view more details

app.use(flash());//uses session cookies
app.use(customMware.setFlash);
app.use('/',require('./routes'));//order matters so routes should be after passport.session


app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);//backtics `` situated just left of key 1 -this is called interpolation where we embed our variables inside the string
    }
    console.log(`Server is running on port: ${port}`);
});