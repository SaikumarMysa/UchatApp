const app=require('./app');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});
const DB=process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
mongoose.connect(DB,{

}).then(()=>console.log('DB connection Successful...'))

const port=process.env.PORT||8001;

const server=app.listen(port,()=>{         
    console.log(`listening to port ${port}`)
});

