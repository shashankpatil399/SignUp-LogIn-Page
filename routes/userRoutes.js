const express = require("express");
const router = express.Router() 
const userController = require("../controller/userController")
const { body, validationResult } = require('express-validator');
const userDataValidate = require("../authValidation/auth");
const verifyToken = require("../middleware/authMiddleware")
const multer = require ("multer")
const path = require("path")
const User = require("../models/userModel")
const {check} = require('express-validator');
const expressValidator = require('express-validator');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/upload/images')
    },
    filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    file.originalname = uniqueSuffix + ext
    cb(null,file.originalname);
    }
  }) 
  const upload = multer({ storage: storage })

router.post('/verify', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Protected route accessed'}
)})

//     router.post("/addUser", upload.single("image"), async (req, res) => {
//     const data = new User({
//     name: req.body?.name,
//     email: req.body?.email,
//     mobile: req.body?.mobile,
//     father: req.body?.father,
//     image: req.file.originalname,
//     Use req.file.filename to get the uploaded file name
//     password: req.body?.password,
//     });

//     Rest of the code...
//                          });
// router.post ("/addUser",upload.single("image"),async (req,res)=>{
//   const data = new User({
   
//     name: req.body?.name,
//     email: req.body?.email,
//     mobile: req.body?.mobile,
//     father: req.body?.father,
//     image: req.body.image,
//     password: req.body?.password,
//   });


router.post("/addUser", upload.single("image"), async (req, res) => {
  const data = new User({
    name: req.body?.name,
    email: req.body?.email,
    mobile: req.body?.mobile,
    father: req.body?.father,
    image: req.file.originalname,  
    password: req.body?.password,
  });
  let email = req.body.email;
  const exist = await User.findOne({email}); 

  if (exist) {
    return res.status(200).json({
      status: 200,
      message: "User already registered",
      data: null,
    });
  } 

  try {
    const savedUser = await data.save();
    res.status(201).json({
      status: 201,
      message: "User registered successfully",
      data: savedUser,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error saving user",
      data: null,
    });
  }
});
router.get("/Lookup",userController.Lookup);
router.post("/addCompany",userController.addCompany)
router.post("/addEmployee",userController.addEmployee)
// router.get("/getuser",userController.getuser);
router.post("/Login",userController.login);
// router.post("/addUser",userController.addUser);
router.get("/get-all-user",userController.getItem);
router.put("/Update/:id",userController.updateUser);
router.delete("/deleteUser/:id",userController.deleteItem);
router.get("/getUserById/:id",userController.getUserById);
// router.post("/addEmplo",userController.addEmplo) 
// router.get( "/getemplo",userController.readEmployee)
// router.get( "/readEmployeeAndUser",userController.readEmployeeAndUser);

module.exports = router;