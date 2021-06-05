const express=require('express');
const router=express.Router();
//router.use(express.urlencoded());//important
const passport=require('passport');
const usersController=require('../controllers/users_controller');
//console.log("router loaded");

router.get('/profile',usersController.profile);

router.get('/posts',usersController.posts);

router.get('/sign-up',usersController.signUp);

router.get('/sign-in',usersController.signIn);

router.post('/create',usersController.create);
//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(  //when user signs in first passport authenticates that data if fails sign-in page is loaded then action is executed
    'local',
    {failureRedirect: '/users/sign-in'},
) ,usersController.createSession);
module.exports=router;
