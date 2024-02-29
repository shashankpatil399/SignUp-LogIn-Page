const mongoose = require("mongoose")
const emplo = new mongoose.Schema({
  
   
    compnayname:{
        type: String
    },

    companyemail: {
        type : String
    },
    userId : {
        type:mongoose.Schema.Types.ObjectId,
        ref : "user" 
    }
})



module.exports = mongoose.model('emplo', emplo);