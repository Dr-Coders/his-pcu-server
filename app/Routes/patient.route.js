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
        var patient = new Patient();
        patient.firstname = req.body.firstname;
        patient.sirname = req.body.sirname;
        patient.nic = req.body.nic;
        patient.dateofbirth = req.body.dateofbirth;
        patient.gender = req.body.gender;
        patient.maritalstatus = req.body.maritalstatus;
        patient.address = req.body.address;
        patient.contact_res = req.body.contact_res;
        patient.contact_mobile = req.body.contact_mobile;
        patient.email = req.body.email;
        patient.guardian_name = req.body.guardian_name;
        patient.guardian_relationship = req.body.guardian_relationship;
        patient.guardian_contact_res = req.body.guardian_contact_res;
        patient.guardian_contact_mobile = req.body.guardian_contact_mobile;
        patient.height = req.body.height;
        patient.weight = req.body.weight;
        patient.bloodgroup = req.body.bloodgroup;

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

            patient.firstname = req.body.firstname;
            patient.sirname = req.body.sirname;
            patient.nic = req.body.nic;
            patient.dateofbirth = req.body.dateofbirth;
            patient.gender = req.body.gender;
            patient.maritalstatus = req.body.maritalstatus;
            patient.address = req.body.address;
            patient.contact_res = req.body.contact_res;
            patient.contact_mobile = req.body.contact_mobile;
            patient.email = req.body.email;
            patient.guardian_name = req.body.guardian_name;
            patient.guardian_relationship = req.body.guardian_relationship;
            patient.guardian_contact_res = req.body.guardian_contact_res;
            patient.guardian_contact_mobile = req.body.guardian_contact_mobile;
            patient.height = req.body.height;
            patient.weight = req.body.weight;
            patient.bloodgroup = req.body.bloodgroup;

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