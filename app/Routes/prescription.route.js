/**
 * Created by Nirmal on 6/28/2017.
 */

const express = require("express");
const Prescription = require("../models/prescription");
const router = express.Router();

router.use(function (req, res, next) {
    console.log("Accessing Prescription API");
    next();
});

router.route("/")
    .post(function (req, res) {
        var prescription = new Prescription(req.body);

        prescription.save(function (err) {
            if (err)
                res.send(err);

            res.json({message: "Prescription created! name = " + req.body.drugs[0]});
        });
    })
    .get(function (req, res) {
        Prescription
            .find()
            .populate('doctor')
            .populate('patient')// only return the Bears name
            .exec(function (err, prescription) {
                if (err)
                    res.send(err);
                console.log("Data : " + prescription[0].drugs[0]);
                res.json(prescription);
            })
    });

router.route("/:id")
    .get(function (req, res) {
        Prescription.findById(req.params.id)
            .populate('doctor')
            .populate('patient')// only return the Bears name
            .exec(function (err, prescription) {
                if (err)
                    res.send(err);
                console.log("Data : " + prescription.drugs[0]);
                res.json(prescription);
            })
    })
    .put(function (req, res) {
        Prescription.findById(req.params.id, function (err, prescription) {
            if (err)
                res.send(err);
            prescription = req.body;

            console.log("updating... " + req.params.id);
            prescription.save(function (err) {
                if (err)
                    res.send(err);
                res.json({message: " Prescription updated to name = " + req.body.drugs[0]});
            })
        })
    })
    .delete(function (req, res) {
        Prescription.remove({
            _id: req.params.id
        }, function (err) {
            if (err)
                res.send(err);
            res.json({message: "Prescription deleted : " + req.params.id})
        });
    });

module.exports = router;