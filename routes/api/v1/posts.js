const express=require('express');
const router=express.Router();
const passport=require('passport');

const postsApi=require('../../../controllers/api/v1/posts_api');

router.get('/',postsApi.index);
//strategy to be given is jwt with session as false so that session cookies are not generated
router.delete('/:id',passport.authenticate('jwt',{session:false}),postsApi.destroy);//authentication check for deletion

module.exports=router;