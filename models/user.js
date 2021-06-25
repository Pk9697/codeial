const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const AVATAR_PATH= path.join('/uploads/users/avatars');//path where we store all avatars
const userSchema= new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }


},{
    timestamps: true    //mongoose maintains created at ,updated at timestaps by applying this property
});

const User=mongoose.model('User',userSchema);//telling mongoose that this->'User' is a model in the database
module.exports=User;//now exporting this User schema