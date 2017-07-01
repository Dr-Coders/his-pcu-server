/**
 * Created by Nirmal on 6/28/2017.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PrescriptionSchema = new Schema({
    date : String,
    time : String,
    doctor : {
        type : mongoose.Schema.ObjectId,
        ref : 'Doctor'
    },
    patient : {
        type :mongoose.Schema.ObjectId,
        ref : 'Patient'
    },
    drugs : [ {
        drug : {
            type : mongoose.Schema.ObjectId,
            ref : 'Drug'
        },
        dose : Number,
        when : [Boolean],
        meal : String,
        days : Number,
        quantity : Number
    } ]


}, { collection: 'prescripiton' });

module.exports = mongoose.model("Prescription",PrescriptionSchema);