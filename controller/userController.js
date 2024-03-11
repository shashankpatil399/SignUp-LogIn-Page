const User = require("../models/userModel")
const emplo = require("../models/emploModel")
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const multer = require("multer")
const upload = multer({ dest: "../upload/images" })
const company = require("../models/companySchema")
const employee = require("../models/emploSchema")


// const addEmplo = async(req,res)=>{
//     console.log("req",req.body)
//     const data = new emplo({
//       userId  : req.body.userId,
//       compnayname: req.body?.compnayname,
//       companyemail: req.body?.companyemail
//      })
//     return res.status(200).json({
//       status: 200,
//       data
//     });}



//reademplo
// const readEmployee = async (req, res) => {

//   fetchid=req.params.id
//   const employee = await emplo.find({_id:fetchid});
//   console.log(employee)
//   res.send(employee);
// }

//reademploanduser
//add user


const addUser = async (req, res) => {
  console.log("req", req.body);
  const data = new User({
    id: req.body?.id,
    name: req.body?.name,
    email: req.body?.email,
    mobile: req.body?.mobile,
    father: req.body?.father,
    password: req.body?.password,
  });

  const email = req.body.email;
  const exist = await User.findOne({ email });

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
};





//get item
const getItem = async (req, res) => {


  const getAllUser = await User.find({})
  console.log("getAllUser", getAllUser);
  res.send(getAllUser)
}


//  const resgetAll =async(req,res)=>{
//   const resp =await User.find({})
//   console.log(resp)
//   res.send(resp)
// }



//update Item
// const updateUser = async(req,res) => {
//   // let upid=req.params.id;
//   // console.log("upid",upid)
//   let  upid=req.body.id;
//  let  upname=req.body.name;
//   let upemail=req.body.email;
//   let  upmobile = req.body.mobile;
//   let  upfather = req.body.father;
//   let uppassword=req.body.password ;

// const resp = await User.findOneAndUpdate({id: upid},{name:upname,email:upemail,mobile:upmobile,father:upfather,pasword:uppassword}, {new: true }, 

const updateUser = async (req, res) => {
  let upid = req.params.id;
  console.log("upid", upid)
  let upname = req.body.name;
  let upemail = req.body.email;
  let upmobile = req.body.mobile;
  let upfather = req.body.father;
  let uppassword = req.body.password;



  const resp = await User.findByIdAndUpdate({ _id: upid }, { $set: { name: upname, email: upemail, mobile: upmobile, father: upfather, pasword: uppassword } })
  console.log(resp);
  res.send(resp)
}



//deleteItem
const deleteItem = async (req, res) => {
  delid = req.params.id
  const resdel = await User.findByIdAndDelete({ _id: delid })
  console.log(resdel)
  res.json({ status: 200, message: "User Deleted Successfully" })
}


//getuser
const getuser = async (req, res) => {
  Z

  const userId = req.id


  console.log("user id", userId)
  const userID = await User.findById(userId)
  res.send(userID)
  console.log(userID);
}

const getUserById = async (req, res) => {
  const userId = req.params.id;
  console.log("----", userId);
  const user = await User.findById(userId)

  res.send(user);
  console.log(user)
}

//login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: 'user Not Found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('Password Match', passwordMatch);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Password Is wrong' });
    }
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
      expiresIn: '1h',
    });
    res.status(200).json({
      status: 200,
      message: "User login!",
      data: user,
      token: token
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
}

const addEmployee = async (req, res) => {
  console.log("body", req.body);
  const Data = new employee({
    name: req.body.name,
    age: req.body.age,
    salery: req.body.salery,
    companyId: req.body.companyId
  })

  const savedEmployee = await Data.save();
  return res.status(200).json({
    message: "employee added succesfully",
    status: 200,
    data: savedEmployee
  })
}


const addCompany = async (req, res) => {
  console.log('body', req.body);
  const data = new company({
    name: req.body.name,
    email: req.body.email,
    location: req.body.location
  })
  const savedCompany = await data.save();
  return res.status(200).json({
    message: "Company added succesfully",
    status: 200,
    data: savedCompany
  })

}

const Lookup = async (req, res) => {
  try {

    const employeess = await company.aggregate([  // company is parent employee



      // {  $count : 'name' } // counting specific data
      // {  $sort : { 'age' : -1 }}, // -1 is for decesnding order and 1 for ascending order
      //  { $limit : 2 } // this is used for limit the result
      // { $group : { _id : "name",
      // maxAgeSalery : {$max : {$multiply: ["$age","$salery"]}},
      // maxAge : {$max : "$age"} }} //does not working

      // {$match : { age : '25'} }// match the specific condition


      //  { $project : 

      //   { _id : 0, name : 1, age : 1, salery : 1 }}, // project is used when you only get specific daTA FROM COLLECTION


      // { $match : { name : 'Emizen Tech' } } ,


      //    {   $group: {

      // emploname : {

      // }


      //  }},

      {
        $lookup:
        {
          from: "employees", //child collection name
          localField: "_id", //  child ID
          foreignField: "companyId", // navigate parent id 
          as: "employeeinfo",
        }
      }, 
      { $unwind: '$employeeinfo' },

      {
        $project: {
          _id: 0,
          name: 1,
          email: 1,
          // employeein: "$employeeinfo",
          employeess : "$employeeinfo.name"
        }

      } /// used $project stage in lookup
      // {
      //   
      // },


    ])
    console.log(employeess);
    res.json(employeess);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');

  }
}
module.exports = { addUser, getItem, login, updateUser, deleteItem, getUserById, addEmployee, addCompany, Lookup };