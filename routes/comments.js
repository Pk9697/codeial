const express=require('express');
const router=express.Router();
const commentsController=require('../controllers/comments_controller');
const passport=require('passport');
//only display post form when user is authenticated using passport
router.post('/create',passport.checkAuthentication,commentsController.create);//2nd level of check using passport 

module.exports=router;