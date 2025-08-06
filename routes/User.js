const express = require('express');
const router = express.Router();
const User_model = require('../models/User_Schema');
const Service_model = require('../models/Services_Schema');
const Report_model = require('../models/Report_Schema');
const Booking_model = require('../models/Booking_Schema');
const Admin_model = require('../models/Admin_Schema');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');

router.get('/', async(req, res) => { 
    let data = await Service_model.find(); 
    res.render('index',{msg:"",data:data,session:req.session.user});
});

router.get('/profile', async(req, res) => { 
    let user=await User_model.find();
    let data = await Service_model.find(); 
    let booking = await Booking_model.find();
    res.render('profile',{msg:"",data:data,user:user,session:req.session.user,booking:booking});
});

router.post("/register",async (req, res) => {
    let data = await Service_model.find(); 
    const data1 = new User_model({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        password:req.body.password,
        gender:req.body.gender,
        address:req.body.address
    });
    User_model.findOne({phone:data1.phone})
    .then(exist => {
        if(exist){
            res.render('index',{msg:"User allready regoster",data:data,session:req.session.user});
        }
        else{
            User_model.create(data1);
            console.log(data1)
            res.render('index',{msg:"Register Suscesfully",data:data,session:req.session.user});
        }
    }) 
});

router.post("/login",async (req, res) => {
    let data = await Service_model.find(); 
    const data1 = new User_model({
        phone: req.body.phone,
        password: req.body.password
    })
    await User_model.findOne({ phone: data1.phone, password: data1.password })
    .then(exist => {
        if (exist) {
            req.session.user=data1;
            res.render('index', { msg: "Login Successfully",data:data,session:req.session.user });
        } else {
            res.render('index', { msg: "Invalid login details",data:data,session:req.session.user });
        }
    })
});

router.get("/about",async (req, res) => {
    let data = await Service_model.find(); 
    res.render('about',{msg:"",data:data,session:req.session.user});
});

router.get("/contact",async (req, res) => {
    let data = await Service_model.find(); 
    res.render('contact',{msg:"",data:data,session:req.session.user});
});

router.get("/service",async (req, res) => {
    let data = await Service_model.find();
    let user1 = await User_model.find(); 
    if(!req.session.user){
        res.render('index',{msg:"Please login first",data:data,session:req.session.user});
    }else{
        res.render('service',{msg:"",data:data,user1:user1,session:req.session.user});
    }
    
});
router.post('/service', async function(req,res){
  if(req.session.user)
  {
    let book = new Booking_model(
    {
      userid: req.body.userid,
      serviceid:req.body.serviceid,
      patients: req.body.patients,
      symptoms: req.body.symptoms,
      date: req.body.date,
      time: req.body.time,
      payment: req.body.payment,
      status: req.body.status
    })
    Booking_model.create(book);
    let user=await User_model.find();
    let data = await Service_model.find(); 
    let booking = await Booking_model.find();
    res.render('profile',{msg:"",data:data,user:user,session:req.session.user,booking:booking});
  }else{
    res.render('index',{msg:"Please login first",data:data,session:req.session.user});
  }
});


router.get('/userlogout',async function(req,res){
    let data = await Service_model.find();
  if(req.session.user){
    res.render('index',{msg:"Logout Successfully",data:data,session:null});
  }else{
    res.render('index',{msg:"Logout Successfully",data:data,session:req.session.user});
  }
});

module.exports = router;






