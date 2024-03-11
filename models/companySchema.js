const mongoose = require("mongoose")
const company = new mongoose.Schema({

    name: {

        type: String
    },
    email: {

        type: String
    },
    location: {

        type: String
    },


})

module.exports = mongoose.model("company", company)