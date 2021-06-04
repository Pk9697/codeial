const express=require('express');
const router=express.Router();
//router.use(express.urlencoded());//important

const usersController=require('../controllers/users_controller');
//console.log("router loaded");

router.get('/profile',usersController.profile);

router.get('/posts',usersController.posts);

router.get('/sign-up',usersController.signUp);

router.get('/sign-in',usersController.signIn);

router.post('/create',usersController.create);
module.exports=router;
