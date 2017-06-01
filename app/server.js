var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var cors = require('cors');

// MongoDB
var dbprescriptions = mongojs('his_pcu',['diagnosis']);
var dbdrugs = mongojs('afproject',['drugs']);

// Express
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
var port = 8080;

// Routes
app.get('/api/diagnosis',function (req,res) {
    console.log("I received a GET request");
    dbprescriptions.diagnosis.find(function (err,docs) {
        console.log("Got from db : " + docs);
        res.json(docs);
    })
});


// Start server
app.listen(port);
console.log('PCU Server is listening on port', port);