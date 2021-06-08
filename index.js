const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=5000;
const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');

// used for session cookie
const session = require('express-session');//ctrl+space for autocomplete options
const passport= require('passport');
const passportLocal=require('./config/passport-local-strategy');
//const MongoStore = require('connect-mongo');//setting up persistent storage so that whenever server restarts it doesn't remove cookie
//const { MongoDBStore } = require('connect-mongodb-session');
const sassMiddleware= require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assets/scss',  //from where do i pick up scss files to convert into css
    dest: './assets/css',       //where do i need to put the css files
    debug:  'true',                    //debug mode is whatever info you see in the terminal while server is running //true cos we want to see if any error occurs to be displayed in terminal //false when we run it in production mode
    outputStyle: 'extended',                      // do i want everything in single line(compressed) or in multiple lines(extended)
    prefix: '/css'                            //where should my server look out for css files //just the prefix of css files in href /css/layout.css 
}));


app.use(express.urlencoded());

app.use(cookieParser());
//use express router before the server starts that is why we use middlewares here
//app.use('/',require('./routes'));//middleware is used to load routes from path ./routes folder
//by default fetches index.js so no need to give path ./routes/index
app.use(express.static('./assets'));

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
    secret: 'blahsomething', //uses this secret key to encrypt cookie
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000*60*100)  //max time cookie will be present
    },
    /*store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )*/
    /*store: MongoStore.create(
        {
            mongoUrl: ,
            autoRemove: 'disabled'
            
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )*/
    /*store: MongoStore.create({
        mongoUrl: MONGO_URL,
        dbName: db
    })*/

}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);//extremely important  go to passport-local-strategy to view more details
app.use('/',require('./routes'));//order matters so routes should be after passport.session

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);//backtics `` situated just left of key 1 -this is called interpolation where we embed our variables inside the string
    }
    console.log(`Server is running on port: ${port}`);
});