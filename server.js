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

const port = 8080;
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/his_pcu");

app.use('/api/diagnosis',require("./app/routes/diagnosis.route"));
app.use('/api/doctor',require("./app/routes/doctor.route"));
app.use('/api/patient',require("./app/routes/patient.route"));
app.use('/api/prescription',require("./app/routes/prescription.route"));
app.use('/api/user',require("./app/routes/user.route"));
app.use('/api/labtest',require("./app/routes/labtest.route"));

app.listen(port,'0.0.0.0',function () {
    console.log("App listening on port " + port);
});

module.exports = app;