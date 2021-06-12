const express=require('express');
const router=express.Router();
const postsController=require('../controllers/post_controller');
const passport=require('passport');
//only display post form when user is authenticated using passport
router.post('/create',passport.checkAuthentication,postsController.create);//2nd level of check using passport 

module.exports=router;