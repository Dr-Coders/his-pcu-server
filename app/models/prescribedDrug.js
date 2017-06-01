// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var prescribedDrugSchema = new mongoose.Schema({
    title: String,
    firstName: String,
    lastName: String,
    dob: Date,
    gender: String,
    civilStatus: String,
    nic: String,
    passport: String,
    citizenship: String,
    language: String,
    bloodGroup: String,
    address: String,
    phone: String,
    mobile: String,
    remark: String
});

// Return model
module.exports = restful.model('newPatient', prescribedDrugSchema);