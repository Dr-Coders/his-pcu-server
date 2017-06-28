/**
 * Created by Nirmal on 6/28/2017.
 */

const express = require("express");
const Patient = require("../models/patient");
const router = express.Router();

router.use(function (req,res,next) {
    console.log("Accessing Patient API");
    next();
});

router.route("/")
    .post(function (req,res) {
        var patient = new Patient(req.body);

        patient.save(function (err) {
            if(err)
                res.send(err);

            res.json({message: "Patient created! name = " + req.body.firstname});
        });
    })
    .get(function (req,res) {
        Patient.find(function (err,patient) {
            if(err)
                res.send(err);
            console.log("Patient : " + patient);
            res.json(patient);
        })
    });

router.route("/:id")
    .get(function (req,res) {
        Patient.findById(req.params.id,function (err,patient) {
            if(err)
                res.send(err);
            res.json(patient);
        });
    })
    .put(function (req,res) {
        Patient.findById(req.params.id,function (err,patient) {
            if(err)
                res.send(err);

            patient = req.body;

            console.log("updating... " + req.params.id);
            patient.save(function (err) {
                if(err)
                    res.send(err);
                res.json({message : " Patient updated to name = " + req.body.firstname});
            })
        })
    })
    .delete(function (req,res) {
        Patient.remove({
            _id:req.params.id
        },function (err) {
            if(err)
                res.send(err);
            res.json({message: "Patient deleted : " + req.params.id})
        });
    });

module.exports = router;