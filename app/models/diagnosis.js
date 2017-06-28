/**
 * Created by Nirmal on 6/28/2017.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DiagnosisSchema = new Schema({
    date : String,
    title : String,
    time : String,
    content : String,
    doctor : {
        type : mongoose.Schema.ObjectId,
        ref : 'Doctor'
    },
    patient : {
        type :mongoose.Schema.ObjectId,
        ref : 'Patient'
    }


});

module.exports = mongoose.model("Diagnosis",DiagnosisSchema);