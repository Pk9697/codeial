const express=require('express'); 
const router=express.Router();
//router.use(express.urlencoded());//important
const passport=require('passport');
const usersController=require('../controllers/users_controller');
//console.log("router loaded");

router.get('/profile/:id',passport.checkAuthentication,usersController.profile);

router.post('/update/:id',passport.checkAuthentication,usersController.update);

//router.post('/posts',usersController.posts);

router.get('/sign-up',usersController.signUp);

router.get('/sign-in',usersController.signIn);

router.post('/create',usersController.create);
//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(  //when user signs in first passport authenticates that data if fails sign-in page is loaded then action is executed
    'local',
    {failureRedirect: '/users/sign-in'},
) ,usersController.createSession);

router.get('/sign-out',usersController.destroySession);


router.get('/auth/google', passport.authenticate('google',{scope: ['profile','email']}));//scope is the info we are looking to fetch
//where i will receive the data
router.get('/auth/google/callback', passport.authenticate('google',{failureRedirect: '/users/sign-in'}),usersController.createSession);


module.exports=router;
