/**
 * Created by Nirmal on 6/29/2017.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LabtestSchema = new Schema({
   medicalcase : String,
    doctor : {
        type : mongoose.Schema.ObjectId,
        ref : 'Doctor'
    },
    labtestname : String,
    date : String,
    labresult : [String] ,
    testinterpretation : String
}, { collection: 'labtest' });

module.exports = mongoose.model("Labtest",LabtestSchema);