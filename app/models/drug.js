/**
 * Created by Nirmal on 7/1/2017.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DrugSchema = new Schema({
    name : String,
    price : Number,
    quantitypertablet : String,
    manufacture : String

}, { collection: 'drug' });

module.exports = mongoose.model("Drug",DrugSchema);