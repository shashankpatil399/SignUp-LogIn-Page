const mongoose =require("mongoose")

const employee = new mongoose.Schema({

name: { 

    type: String
},

age: {

    type: Number
},
salery :{

    type: Number
},

companyId: {
    
   type : mongoose.Schema.Types.ObjectId, 
    ref: 'company'
}
})

module.exports = mongoose.model("employee",employee)
