var express = require('express');
var multer = require('multer');
var path = require('path');
var jwt= require("jsonwebtoken");
var router = express.Router();
var empModel= require('../modules/employee');
var uploadModel =require('../modules/upload');

var employee=empModel.find({});
var imageData=uploadModel.find({});
router.use(express.static(__dirname+"./public/"));

//  log in token validation 

if (typeof localStorage ==="undefined" || localStorage==="null") {
  const LocalStorage= require('node-localstorage').LocalStorage;
  localStorage= new LocalStorage('./scracth')
}

var Storage=multer.diskStorage({
  destination:"./public/uploads/",
  filename:(req,file,cb)=>{
    cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
  }
});

var upload= multer({
 storage:Storage
}).single('file');

router.post('/upload', upload, (req, res, next) => {
   var imageFile = req.file.filename;
  var success= req.file.filename+"Uploaded successfully";
  var imagedetails = new uploadModel({
    imagename: imageFile
  });
  imagedetails.save((err,doc)=>{
    if (err) throw error;
    imageData.exec((err,data)=>{
      if (err) throw error;
      res.render('upload-file', { title: 'upload photo', records:data , success: success })
    });
  });
});

// middleware for login
function checklogin(req,res,next) {
  var myToken=localStorage.getItem('myToken');
  try{
    jwt.verify(myToken,'loginToken');
  }catch(err){
    res.send("You need to login first to access this page");
  }
  next();
}

router.get('/upload', checklogin, (req, res, next) => {
  imageData.exec((err,data)=>{
    if (err) throw error;
    res.render('upload-file', { title: 'upload photo',records:data ,success: '' })
  });
});

//Home page 

router.get('/', checklogin,(req,res,next)=>{
  employee.exec((err,data)=>{
    if (err) throw err;
    res.render('index',{title:'Employee Record',records:data,success:''})
  });
});


// Log in coding

router.get('/login', (req, res, next) => {
  var token= jwt.sign({foo:'bar'},'loginToken');
  localStorage.setItem('myToken',token);
  res.send("Login successfully");    
});

// logout Conding


router.get('/logout', (req, res, next) => {
  localStorage.removeItem('myToken');
  res.send("Logout  successfully");    
});

// insert the employee form coding

router.post('/',(req,res,next)=>{
  var empdetails = new empModel({
    name: req.body.ename,
    email: req.body.eemail,
    etype: req.body.etype,
    hourratte: req.body.hrate,
    totalhour: req.body.thoure
  });

empdetails.save((err,res1)=>{
  if(err) throw error;
  employee.exec((err, data) => {
    if (err) throw error;
    res.render('index', { title: 'Employee List', records: data,success:" The record is inserted"  });
  });
});
});

//   Filter record

router.post('/search/', function (req, res, next) {
  var filtername = req.body.fname;
  var filteremail = req.body.femail;
  if (filtername !== "") {
    var fliterresult = { name: filtername }
  }else
  if (filteremail !=="") {
    var fliterresult= {email:filteremail}
  }else
  if (filtername!=='' && filteremail=="") {
    var fliterresult={name:filtername}
  }else
  if (filtername=="" && filteremail!=="") {
    var fliterresult={etype:filteremail}
  }
  var filtermodel = empModel.find(fliterresult);
  filtermodel.exec((err,data)=>{
    if (err) throw error;
    res.render('index', { title: 'Employee List', records: data , success:'The record is found'});
  });
});

// Delete the records
router.get('/delete/:id', function (req, res, next) {
  var id= req.params.id;
  var del= empModel.findByIdAndDelete(id);

  del.exec((err, data) => {
    if (err) throw error;
    employee.exec((err, data) => {
      if (err) throw error;
      res.render('index', { title: 'Employee List', records: data, success: ' Data deleted' });
    });

  });

});

// Edit the records
router.get('/edit/:id', function (req, res, next) {
  var id= req.params.id;
  var edit=empModel.findByIdAndUpdate(id)

  edit.exec((err, data) => {
    if (err) throw error;

    res.render('edit', { title: 'Edit Employee Recor', records: data });
  });

});

router.post('/update/', function (req, res, next) {
  
  var update=empModel.findByIdAndUpdate(req.body.id,{
      name: req.body.ename,
      email: req.body.eemail,
      etype: req.body.etype,
      hourratte: req.body.hrate,
      totalhour: req.body.thoure
  });

  update.exec((err, data) => {
    if (err) throw error;
    employee.exec((err, data) => {
      if (err) throw error;
       res.render('index', { title: 'Employee List', records: data, success:" Record Updated succefully" });
    });


  });

});


module.exports = router;
