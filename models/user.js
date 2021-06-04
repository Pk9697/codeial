const mongoose=require('mongoose');
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

const User=mongoose.model('User',userSchema);//telling mongoose that this is a model
module.exports=User;//now exporting this User schema