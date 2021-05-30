const express=require('express');//fetch the existing express instance, does not get created again and again,here main index.js express instance is used

const router=express.Router();//we are doing this to separate our routes into another folder or files
const homeController=require('../controllers/home_controller');
console.log("router loaded");

router.get('/',homeController.home);
module.exports=router;
