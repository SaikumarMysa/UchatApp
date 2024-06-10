const mongoose=require('mongoose');
const chatSchema=mongoose.Schema({
    senderId:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    receiverId:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    message:{
        type:String,
        required:true
    }
},
{timestamps:true}
)
const Chat=mongoose.model('Chat',chatSchema);