exports.isLogin=async(req,res,next)=>{
    try{
        if(req.session.user){

        }else{
            res.render("login.ejs")
        }    
    }catch(err){
        console.log(err.message)
    }
    next();
}


//isLogout?
exports.isLogout=async(req,res,next)=>{
    try{
        if(req.session.user){

        }else{
            res.render("login.ejs")
        }    
    }catch(err){
        console.log(err.message)
    }
    next();
}