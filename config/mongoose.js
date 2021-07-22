//setting up mongodb database using mongoose
const mongoose=require('mongoose');//require the library odm 
const env=require('./environment');
mongoose.connect(`mongodb://localhost/${env.db}`);//connect to database (with name codial_db)
//acquire the connection (to check if it is successful)
const db=mongoose.connection;// this db will be used accessing our database or verify if mongodb server is connected to our database or not
db.on('error',console.error.bind(console,'connection error to db:'));//error
db.once('open',function(){//if up and running then print the message
    console.log("successfully connected to database");
});

module.exports = db;
