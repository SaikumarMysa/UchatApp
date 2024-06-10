const express=require('express');
const morgan=require('morgan');
const app=express();
const path=require('path');
const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});
const bodyParser=require('body-parser');
const http=require('http');
const session=require('express-session');
const userRouter=require('./routes/userRoutes')
const userController=require('./controllers/userController');
const router=express.Router();
//MIDDLEWARES
//body-parser which puts body into req.body
//Development logging
// if(process.env.NODE_ENV==='development'){
//   app.use(morgan('dev'));
// }
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET, // replace 'your-secret-key' with your actual secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set 'secure' to true if using https
  }));
//setting view engine
app.set('view engine','ejs');
// app.set('views','./views')
app.set('views', path.resolve('./views'));
//reads static files
app.use(express.static('public'));
app.use('/',userRouter)

const server=http.createServer(app)
const io=require('socket.io')(server);
io.on('connection',function(socket){
  console.log('User Connected')

  socket.on('disconnect',function(){
    console.log('User Disconnected')
  })
})

module.exports=app;