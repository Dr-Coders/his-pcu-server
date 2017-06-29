/**
 * Created by Nirmal on 6/29/2017.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username : String,
    password : String,
    role : String,
    object : String


}, { collection: 'user' });

module.exports = mongoose.model("User",UserSchema);