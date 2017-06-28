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
        var diagnosis = new Diagnosis(req.body);

        diagnosis.save(function (err) {
            if (err)
                res.send(err);

            res.json({message: "Diagnosis created! name = " + req.body.title});
        });
    })
    .get(function (req, res) {
        // Diagnosis.find(function (err, diagnosis) {
        //     if (err)
        //         res.send(err);
        //     console.log("Diagnosis : " + diagnosis);
        //     res.json(diagnosis);
        // });
        Diagnosis
            .find()
            .populate('doctor')
            .populate('patient')// only return the Bears name
            .exec(function (err, diagnosis) {
                if (err)
                    res.send(err);
                console.log("Data : " + diagnosis[0].doctor.firstname);
                res.json(diagnosis);
            })
    });

router.route("/:id")
    .get(function (req, res) {
        Diagnosis.findById(req.params.id, function (err, diagnosis) {
            if (err)
                res.send(err);
            res.json(diagnosis);
        });
    })
    .put(function (req, res) {
        Diagnosis.findById(req.params.id, function (err, diagnosis) {
            if (err)
                res.send(err);
            diagnosis = req.body;

            console.log("updating... " + req.params.id);
            diagnosis.save(function (err) {
                if (err)
                    res.send(err);
                res.json({message: " Diagnosis updated to name = " + req.body.title});
            })
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
    });

module.exports = router;