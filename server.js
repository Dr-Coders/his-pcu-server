/**
 * Created by Nirmal on 6/28/2017.
 */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors());

const port = 3000;
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/his-pcu-client");

app.use('/api/bears',require("./app/routes/bearRoutes"));

app.listen(port);
console.log("App listening on port " + port);

module.exports = app;