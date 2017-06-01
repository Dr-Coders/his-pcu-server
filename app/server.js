var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var cors = require('cors');

// MongoDB
var dbdiagnosis = mongojs('his_pcu',['diagnosis']);
var dbdrugs = mongojs('his_pcu',['drugs']);

// Express
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
var port = 8080;

// Routes
//get data from the diagnosis collections
app.get('/api/diagnosis',function (req,res) {
    console.log("I received a GET request");
    dbdiagnosis.diagnosis.find(function (err,docs) {
        console.log("Got from db : " + docs);
        res.json(docs);
    })
});

//post data to diagnosis
app.post('/api/diagnosis',function (req,res) {
    console.log("req body : " + req.body);
    dbdiagnosis.diagnosis.insert(req.body,function (err,doc) {
        res.json(doc);
    });
});


//get data from the drugs collections
app.get('/api/drugs',function (req,res) {
    console.log("I received a GET request");
    dbdrugs.drugs.find(function (err,docs) {
        console.log("Got from db : " + docs);
        res.json(docs);
    })
});


// Start server
app.listen(port);
console.log('PCU Server is listening on port', port);