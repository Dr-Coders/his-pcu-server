/**
 * Created by Nirmal on 6/28/2017.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PatientSchema = new Schema({
    firstname : String,
    sirname : String,
    nic : String,
    dateofbirth : String,
    gender : String,
    maritalstatus : String,
    address : String,
    contact_res : String,
    contact_mobile : String,
    email : String,
    guardian_name :String,
    guardian_relationship : String,
    guardian_contact_res : String,
    guardian_contact_mobile : String,
    height : String,
    weight : String,
    bloodgroup : String

});

module.exports = mongoose.model("Patient",PatientSchema);