var express = require('express');
var router = express.Router();
var path = require('path');
let mongoose = require("mongoose");
var session = require('express-session');
let Admin_Schema =require("../models/Admin_Schema");
let Booking_Schema = require("../models/Booking_Schema");
let Service_Schema = require("../models/Services_Schema");
let Report_Schema = require("../models/Report_Schema");
let User_Schema = require("../models/User_Schema");
let multer = require('multer');

router.get('/',function(req,res)
{
    res.render('admin/admin1',{msg:""});
});


router.post('/login',function(req,res)
{    
        Admin_Schema.findOne({ userid: req.body.userid,password:req.body.password })
          .then(exist => {
            if (exist) {
                req.session.admin = req.body.userid;
                res.render('admin/profile',{msg:""});

            } else {
              res.render('admin/admin1',{msg:"invalid login details"});
            }
          })
          .catch(error => {
            console.error('Error finding user:', error);
          });
});

router.get('/profile',function(req,res){
  if(req.session.admin)
  {
    res.render('admin/profile',{msg:""})
  }else
  {
    res.render('admin/admin1',{msg:"please Admin login first"});
  }
  
});


router.get('/adduser',function(req,res){
  if(req.session.admin){
    res.render('admin/addUser',{msg:""})
  }else{
    res.render('admin/admin1',{msg:"please Admin login first"}); 
  }
})
router.post('/adduser',function(req,res){
  if(req.session.admin)
  {
    const data1 = new User_Schema({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            password:req.body.password,
            gender:req.body.gender,
            address:req.body.address
        });
        User_Schema.findOne({phone:data1.phone})
        .then(async exist => {
            if(exist){
                res.render('admin/addUser',{msg:"User allready exisr"});
            }
            else{
                await User_Schema.create(data1);
                let alluser = await User_Schema.find()
                res.render('admin/allUser',{msg:"User added suscesfully",alluser:alluser});
            }
        })
  }else
  {
    res.render('admin/admin1',{msg:"please Admin login first"});
  }
  
});

router.get('/alluser', async function(req,res){
  if(req.session.admin)
  {
    let alluser = await User_Schema.find()
    res.render('admin/allUser',{msg:"",alluser:alluser});
  }else
  {
    res.render('admin/admin1',{msg:"please Admin login first"});
  }
});
router.get('/userdelete/:delete', async function(req,res){
  // res.send(req.params.userDelete)
  if(req.session.admin)
  {
    
    let del =  await User_Schema.findOneAndDelete({_id : req.params.delete})
    let alluser = await User_Schema.find();
    res.render('admin/allUser',{msg:"User delete sucsefully",alluser:alluser});
  }else{
    res.render('admin/admin1',{msg:"please Admin login first"});
  }
})
router.get('/edit/:userid', async function(req,res){
  if(req.session.admin)
  {
    let user = await User_Schema.findOne({_id:req.params.userid});
    console.log(req.params.userid);
    console.log(user);
    res.render('admin/edit',{msg:"",user:user});
  }else
  {
    res.render('admin/admin1',{msg:"please Admin login first"});
  }
});

// router.('/update', async function(req,res){
//   if(req.session.admin)
//   {
    
//       const var1 = await User_Schema.updateOne(
//         { _id: req.body.id },
//         {
//           name: req.body.name,
//           email: req.body.email,
//           phone: req.body.phone,
//           password:req.body.password,
//           gender:req.body.gender,
//           address:req.body.address
//         }
//       );
//       let alluser = await User_Schema.find();
//       res.render('admin/allUser',{msg:"updated successfully done",alluser:alluser});
//   }else
//   {
//     res.render('admin/admin1',{msg:"please Admin login first"});
//   }
// });


router.post('/update', async function (req, res) {
  try {
    if (req.session.admin) { // Check if admin session exists
      // Update the user document based on the provided ID
      const result = await User_Schema.updateOne(
        { _id: req.body.id }, // Filter
        { 
          $set: {  // Use $set to update specific fields
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            gender: req.body.gender,
            address: req.body.address,
          } 
        }
      );

      if (result.modifiedCount > 0) { // Check if any document was modified
        const allUsers = await User_Schema.find(); // Fetch all users
        res.render('admin/allUser', {
          msg: "User updated successfully!",
          alluser: allUsers
        });
      } else {
        res.render('admin/allUser', {
          msg: "No changes made or user not found.",
          alluser: await User_Schema.find()
        });
      }
    } else {
      res.render('admin/admin1', { msg: "Please log in as an admin first." });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).render('admin/admin1', { msg: "An error occurred during update. Please try again." });
  }
});

router.get('/view/:id', async function(req,res){
  // res.send(req.params.userDelete)
  if(req.session.admin)
  {
    let user = await User_Schema.findOne({_id : req.params.id})
    res.render('admin/viewUser',{msg:"",user:user});
  }else{
    res.render('admin/admin1',{msg:"please Admin login first"});
  }
})

router.get("/addBooking",async function(req,res){
  if(req.session.admin)
  {
    let service = await Service_Schema.find();
    let user = await User_Schema.find();
    res.render('admin/addBooking',{msg:"",service:service,user:user});    
  }
  else
  {
    res.render('admin/admin1',{msg:"please Admin login first"});
  }
});
router.post('/addbooking', async function(req,res){
  if(req.session.admin)
  {
    let booking = new Booking_Schema(
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
    Booking_Schema.create(booking);
    let data = await Booking_Schema.find();
    service = await Service_Schema.find();
    res.render('admin/allBooking',{msg:"book added successfully",data:data,service:service});
  }else{
    res.render('admin/admin1',{msg:"please Admin login first"});
  }
});
router.get('/allbooking',async (req,res)=>{
  if(req.session.admin){
    service = await Service_Schema.find();
    const data = await Booking_Schema.find();
    console.log(data);
    res.render('admin/allBooking',{msg:"",data:data,service:service});
  }else{
    res.render('admin/admin1',{msg:"please Admin login first"});
  }
})
router.get('/bookingdelete/:delete', async function(req,res){
  // res.send(req.params.userDelete)
  if(req.session.admin)
  {
    let data = await Booking_Schema.find();
    let del =  await Booking_Schema.findOneAndDelete({_id : req.params.delete})
    let alluser = await User_Schema.find();
    res.render('admin/allBooking',{msg:"Booking delete sucsefully",alluser:alluser,data:data});
  }else{
    res.render('admin/admin1',{msg:"please Admin login first"});
  }
})


router.get("/addServices",async function(req,res){
  if(req.session.admin)
  {
    res.render('admin/addServices',{msg:""});    
  }
  else
  {
    res.render('admin/admin1',{msg:"please Admin login first"});
  }
});
router.post("/addServices",function(req,res){
  if(req.session.admin)
  {
    let fileName1='';
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './public/images/services')
      },
      filename: function (req, file, cb) {
        fileName1 = Date.now() +path.extname(file.originalname);
        cb(null,fileName1);
      }
    })
      Service_Schema.findOne({ name: req.body.name })
      .then(exist => {
        if (exist) {
            res.render('admin/addServices', { msg: "Service already exist" });
        }else{
            const upload = multer({
               storage: storage 
              }).single('image');
            upload(req, res, function (err) {
              if (err) {
                console.log(err);
                res.render('admin/addServices', { msg: "uploading failed" });
              } else {
                const data1 = new Service_Schema({
                  name: req.body.name,
                  price: req.body.price,
                  details: req.body.details,
                  image: fileName1
                });
                Service_Schema.create(data1);
                res.render('admin/addServices', { msg: "Service added successfully" });
              }
            });
            
        }
      })
      .catch(error => {
        console.error('Error finding user:', error);
      });
  }
  else
  {
    res.render('admin/admin1',{msg:"please Admin login first"});
  }

});
router.get('/allServices',async(req,res)=>{
 
      const data = await Service_Schema.find();
      // console.log(data);
      res.render('admin/allServices',{msg:"",services:data});
  
});
router.get('/servicedelete/:delete', async function(req,res){
  if(req.session.admin)
  { 
    let del =  await Service_Schema.findOneAndDelete({_id : req.params.delete})
    let services = await Service_Schema.find();
    res.render('admin/allServices',{msg:"Service delete sucsefully",services:services});
  }else{
    res.render('admin/admin1',{msg:"please Admin login first"});
  }
})


router.get('/addreport',async function(req,res){
  if(req.session.admin)
  {
    let service = await Service_Schema.find();
    let user = await User_Schema.find();
    res.render('admin/addReport',{msg:"",service:service,user:user})
  }else
  {
    res.render('admin/admin1',{msg:"please Admin login first"});
  }
  
});
router.post('/addreport',async function(req,res){
  if(req.session.admin)
  {
    let report = new Report_Schema(
      {
        userName: req.body.userName,
        serviceName:req.body.serviceName,
        doctor : req.body.doctor,
        description : req.body.description,
        payment_status: req.body.payment_status,
        
      })
     Report_Schema.create(report);
     let allReport = await Report_Schema.find();
     res.render('admin/allReport',{msg:"Report added successfully",report:allReport});
  }else
  {
    res.render('admin/admin1',{msg:"please Admin login first"});
  }
  
});
router.get('/allreport',async function(req,res){
  if(req.session.admin)
  {
    const report = await Report_Schema.find();
    res.render('admin/allReport',{msg:"",report:report})
  }else
  {
    res.render('admin/admin1',{msg:"please Admin login first"});
  }
  
});
router.get("/report",function(req,res){
    res.render('admin/report',{msg:""}); 
});
router.get('/reportdelete/:delete', async function(req,res){
  // res.send(req.params.userDelete)
  if(req.session.admin)
  {
    let del =  await Report_Schema.findOneAndDelete({_id : req.params.delete})
    const report = await Report_Schema.find();
    res.render('admin/allReport',{msg:"User delete sucsefully",report:report});
  }else{
    res.render('admin/admin1',{msg:"please Admin login first"});
  }
})


router.get('/logout',function(req,res){
  if(req.session.admin){
    req.session.admin=null;
    // res.require('index')
    res.redirect('/userlogout')
  }else{
    res.redirect('/')
  }
});


module.exports = router;