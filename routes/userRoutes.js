const express=require('express');
const userController=require('./../controllers/userController');
const authController=require('./../controllers/authController');
const router=express.Router();
//ROUTES
router.get('/registerLoad',userController.registerLoad)
router.post('/register',userController.uploadUserPhoto,userController.register)

router.get('/',authController.isLogout,userController.loadLogin)
router.post('/',userController.login)
router.get('/logout',authController.isLogin,userController.logout)

router.get('/dashboard',authController.isLogin,userController.loadDashboard)

router.get('*',function(req,res){
    res.redirect('/');
})

module.exports=router;