const { request } = require('express');
const express=require('express');//fetch the existing express instance, does not get created again and again,here main index.js express instance is used

const router=express.Router();//we are doing this to separate our routes into another folder or files
//router.use(express.urlencoded());//important

const homeController=require('../controllers/home_controller');
//console.log("router loaded");

router.get('/',homeController.home);

router.use('/users',require('./users'));//will use users.js when request comes for users
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
router.use('/api',require('./api'))
router.use('/likes',require('./likes'));
router.use('/friends',require('./friends'));

module.exports=router;
