const mongoose = require('mongoose');

const emp = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    job:{
        type: String,
        required:true
    },
    salary:{
        type: Number,
        required:true
    }
})

const employee = mongoose.model("empSchema",emp);

module.exports= employee