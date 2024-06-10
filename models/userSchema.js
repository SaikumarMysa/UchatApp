const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcrypt');
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'User must have a name']
    },
    email:{
        type:String,
        required:[true,'User must have a email'],
        unique:true
    },
    photo:{
        type:String,
        default:'default.jpg'
    },
    password:{
        type:String,
        required:[true,'Please enter password!']
    },
    passwordConfirm:{
        type:String,
        required:[true,'Re-enter password!'],
        validate:{
            validator:function(el){
                return el===this.password
            }
        }
    },
    is_online:{
        type:String,
        default:'0'
    }
},

    {timestamps:true}
);

//document middleware
userSchema.pre('save', async function(next){
    //1. If the password is not modified then donot perform hashing,move to next
    if(!this.isModified('password')) return next()
        //if password is new or modified perfome hashing
    this.password=await bcrypt.hash(this.password,12)
    //delete passwordConfirm field in db
    this.passwordConfirm=undefined;
    next();
})
const User=mongoose.model('User',userSchema);
module.exports=User;