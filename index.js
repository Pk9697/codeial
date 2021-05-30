const express=require('express');
const app=express();
const port=5000;

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);//backtics `` situated just left of key 1 -this is called interpolation where we embed our variables inside the string
    }
    console.log(`Server is running on port: ${port}`);
});