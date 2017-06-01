// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var diagnosisSchema = new mongoose.Schema({
    date:String,
    title:String,
    doctor:String,
    time:String,
    content:String

});

// Return model
module.exports = restful.model('diagnosis', diagnosisSchema);