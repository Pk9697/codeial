const express=require('express');
const app=express();
const port=5000;
//use express router before the server starts that is why we use middlewares here
app.use('/',require('./routes'));//middleware is used to load routes from path ./routes folder
//by default fetches index.js so no need to give path ./routes/index

app.set('view engine','ejs');//setting ejs view engine 
//setting the folder where views folder will be located
app.set('views','./views');//./views is the path where html files will be located instead of path.join
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);//backtics `` situated just left of key 1 -this is called interpolation where we embed our variables inside the string
    }
    console.log(`Server is running on port: ${port}`);
});