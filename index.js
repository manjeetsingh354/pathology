//express
var express = require('express');
//path
var path=require('path');
//session
const session = require('express-session');
//override
const methodOverride = require('method-override');

//connect-flash
const flash = require('connect-flash');

//database
const connectDB = require('./utils/db');
// Connect to Database  
connectDB();

var app=express();//Create Object

app.use(methodOverride('_method'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      }
    })
);

// Flash Messages
app.use(flash());

app.use('/',require('./routes/User'));
app.use("/admin",require("./routes/Admin"));


app.listen(5000,function(req,res){
    console.log("Running on Port:"+5000);
});