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
    },
    avatar: {//we need to save the reference or path where avatars will be stored inside users schema 
        type: String
    },
    friendships: [//for superfast access when trying to find friends of a logged in user
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Friendship'
        }
    ]


},{
    timestamps: true    //mongoose maintains created at ,updated at timestaps by applying this property
});
//disk storage engine which gives full control on storing files to disk
let storage=multer.diskStorage({
    destination: function(request,file,cb){//for a request there is a file with callback fxn cb
        //exact path where file needs to store 
        cb(null,path.join(__dirname,'..',AVATAR_PATH));//__dirname gives the current path which user.js now go .. two steps above now at this level(models) uploads is just the neighbour so we can join to it avatar path
    },
    filename: function(request,file,cb){
        cb(null,file.fieldname+'-'+Date.now());//every fieldname avatar is appended with date milliseconds to make filename unique
    }
});

//static fxns or methods which will be accessed in usersController update fxn
userSchema.statics.uploadedAvatar=multer({storage: storage}).single('avatar');//.single ensures only 1 file will be uploaded with the fieldname avatar
userSchema.statics.avatarPath=AVATAR_PATH;//to access AVATAR_PATH publically


const User=mongoose.model('User',userSchema);//telling mongoose that this->'User' is a model in the database
module.exports=User;//now exporting this User schema