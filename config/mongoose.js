const mongoose=require('mongoose');//require the library odm 
mongoose.connect('mongodb://localhost/codeial_db');//connect to database (with name contacts_list_db)
//acquire the connection (to check if it is successful)
const db=mongoose.connection;// this db will be used accessing our database or verify if mongodb server is connected to our database or not
db.on('error',console.error.bind(console,'connection error to db:'));//error
db.once('open',function(){//if up and running then print the message
    console.log("successfully connected to database");
});
