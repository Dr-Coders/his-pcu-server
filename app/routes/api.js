var express = require('express');
var router = express.Router();

// Models
var Diagnosis = require('../models/diagnosis.js');
var PrescribedDrug = require('../models/PrescribedDrug.js');

// REGISTER ROUTES
Diagnosis.methods(['get', 'put', 'post', 'delete']);
Diagnosis.register(router, '/diagnosis');

PrescribedDrug.methods(['get', 'put', 'post', 'delete']);
PrescribedDrug.register(router, '/PrescribedDrug');

// RETURN ROUTER
module.exports = router;