/**
 * Created by Nirmal on 6/28/2017.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DoctorSchema = new Schema({
    firstname : String,
    lastname : String,
    speciality : String,
    nic : String,
    contact_res : String,
    contact_mobile : String,
    address : String
});

module.exports = mongoose.model("Doctor",DoctorSchema);