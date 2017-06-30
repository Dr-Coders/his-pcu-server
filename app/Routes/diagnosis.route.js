/**
 * Created by Nirmal on 6/28/2017.
 */

const express = require("express");
const Diagnosis = require("../models/diagnosis");
const router = express.Router();

router.use(function (req, res, next) {
    console.log("Accessing Diagnosis API");
    next();
});

router.route("/")
    .post(function (req, res) {
        var diagnosis = new Diagnosis();
        diagnosis.title = req.body.title;
        diagnosis.date = req.body.date;
        diagnosis.doctor = req.body.doctor;
        diagnosis.time = req.body.time;
        diagnosis.content = req.body.content;
        diagnosis.patient = req.body.patient;

        console.log("Adding diagnosis : " + req.body.doctor + "  " + req.body.title);
        diagnosis.save(function (err) {
            if (err) {
                console.log("error diagnosis add : " + err);
                res.send(err);
            }
            else{
                console.log("ADD diagnosis : " + req.body.title);
            }
            // else
            //     res.json({message: "Diagnosis created! name = " + req.body.title});
        });
    })
    .get(function (req, res) {
        Diagnosis
            .find()
            .populate('doctor')
            .populate('patient')
            .exec(function (err, diagnosis) {
                if (err)
                    res.send(err);
                console.log("Data : " + diagnosis[0].doctor.firstname);
                res.json(diagnosis);
            })
    });

router.route("/:id")
    .get(function (req, res) {
        Diagnosis.find({"patient" : req.params.id})
            .populate('doctor')
            .populate('patient')
            .exec(function (err, diagnosis) {
                if (err)
                    res.send(err);
                console.log("Data for patient : " + req.params.id + " is " + diagnosis[0].title + diagnosis.title);
                res.json(diagnosis);
            })
    })
    .put(function (req, res) {
        Diagnosis.findById(req.params.id, function (err, diagnosis) {
            if (err)
                res.send(err);
            else {
                diagnosis = req.body;

                console.log("updating... " + req.params.id);
                diagnosis.save(function (err) {
                    if (err)
                        res.send(err);
                    res.json({message: " Diagnosis updated to name = " + req.body.title});
                })
            }
        })
    })
    .delete(function (req, res) {
        Diagnosis.remove({
            _id: req.params.id
        }, function (err) {
            if (err)
                res.send(err);
            res.json({message: "Diagnosis deleted : " + req.params.id})
        });
    })
    .post(function () {

    });

module.exports = router;