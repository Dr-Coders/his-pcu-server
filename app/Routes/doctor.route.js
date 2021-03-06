/**
 * Created by Nirmal on 6/28/2017.
 */

const express = require("express");
const Doctor = require("../models/doctor");
const router = express.Router();

router.use(function (req,res,next) {
    console.log("Accessing Doctor API");
    next();
});

router.route("/")
    .post(function (req,res) {
        var doctor = new Doctor();
        doctor.firstname = req.body.firstname;
        doctor.lastname = req.body.lastname;
        doctor.speciality = req.body.speciality;
        doctor.nic = req.body.nic;
        doctor.contact_res = req.body.contact_res;
        doctor.contact_mobile = req.body.contact_mobile;
        doctor.address = req.body.address;

        doctor.save(function (err) {
            if(err)
                res.send(err);

            res.json({message: "Doctor created! name = " + req.body.firstname});
        });
    })
    .get(function (req,res) {
        Doctor.find(function (err,doctor) {
            if(err)
                res.send(err);
            console.log("Doctor : " + doctor);
            res.json(doctor);
        })
    });

router.route("/:id")
    .get(function (req,res) {
        Doctor.findById(req.params.id,function (err,doctor) {
            if(err)
                res.send(err);
            res.json(doctor);
        });
    })
    .put(function (req,res) {
        Doctor.findById(req.params.id,function (err,doctor) {
            if(err)
                res.send(err);

            doctor.firstname = req.body.firstname;
            doctor.lastname = req.body.lastname;
            doctor.speciality = req.body.speciality;
            doctor.nic = req.body.nic;
            doctor.contact_res = req.body.contact_res;
            doctor.contact_mobile = req.body.contact_mobile;
            doctor.address = req.body.address;

            console.log("updating... " + req.params.id);
            doctor.save(function (err) {
                if(err)
                    res.send(err);
                res.json({message : " Doctor updated to name = " + req.body.firstname});
            })
        })
    })
    .delete(function (req,res) {
        Doctor.remove({
            _id:req.params.id
        },function (err) {
            if(err)
                res.send(err);
            res.json({message: "Doctor deleted : " + req.params.id})
        });
    });

module.exports = router;