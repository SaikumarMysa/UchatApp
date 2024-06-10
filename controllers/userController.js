const express=require('express');
const User=require('./../models/userSchema');
const bcrypt=require('bcrypt')
const multer=require('multer');
const path=require('path')
//UPLOAD USER IMAGE
const multerStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        // cb(null,path.join(__dirname,'public/userimages/images'));
        cb(null,'public/userimages/images');
    },
    filename:(req,file,cb)=>{
       const name=Date.now()+'-'+file.originalname;
        cb(null,name);
    }
})
const upload=multer({
    storage:multerStorage
});
exports.uploadUserPhoto=upload.single('photo');

//REGISTER USER
exports.register=async(req,res)=>{
    try{
        const user=new User({  
            name:req.body.name,
            email:req.body.email,
            photo:req.file.filename,
            password:req.body.password,
            passwordConfirm:req.body.passwordConfirm
    })
    await user.save();
    return res.render("register.ejs",{message:'Your Registration has been successful!!'})
    }catch(err){
        console.log(err.message);
    }   
}
//
exports.registerLoad=(req,res)=>{
    try{
        return res.render("register.ejs")
    }catch(err){
        console.log(err.message)
    }
}

//LOGIN
// exports.login=async(req,res)=>{
    //checking if there's auser in db with given email, and also checking whether given
    //password is correct
//     try{
//         const email=req.body.email;
//         const password=req.body.password;
//         const user=await User.findOne({email})
//         if(user){
//             //then check given password matches the one with in db
//             const match=await bcrypt.compare(password,user.password)
//             console.log(match)
//             if(match){
//                 req.session.user=user;
//                 res.redirect('/dashboard')
//             }else{
//                 res.render("login.ejs",{message:'Email or Password is incorrect'})
//             }
//         }else{
//             res.render("login.ejs",{message:'Email and password is incorrect!'})
//         }
//     }catch(err){
//         console.log(err.message);
//     }
// }


exports.login=async(req,res)=>{
    //checking if there's auser in db with given email, and also checking whether given
    //password is correct
    try{
        const email=req.body.email;
        const password=req.body.password;
        const user=await User.findOne({email})
        if(user){
            const match=await bcrypt.compare(password,user.password)
            if(match){
                req.session.user=user;
                return res.redirect('/dashboard')
            }
        }else{
            return res.render("login.ejs",{message:'Email and password is incorrect!'})
        }
    }catch(err){
        console.log(err.message);
    }
}
//load login
exports.loadLogin=(req,res)=>{
    try{
         return res.render("login.ejs")
    }catch(err){
        console.log(err.message)
    }
}

//
exports.logout=async(req,res)=>{
    try{
       await req.session.destroy();
       return res.redirect('/')
    }catch(err){
        console.log(err.message)
    }
}

//LOAD DASHBOARD
exports.loadDashboard=async(req,res)=>{
    try{
        var users=await User.find({_id:{$nin:[req.session.user._id]}})
       return  res.render("dashboard.ejs",{user:req.session.user,users:users})
    }catch(err){
        console.log(err.message)
    }
}