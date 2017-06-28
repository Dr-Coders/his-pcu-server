/**
 * Created by Nirmal on 6/28/2017.
 */

var express = require("express");
var Diagnosis = require("../models/diagnosis");
var router = express.Router();

router.use(function (req,res,next) {
    console.log("Accessing Diagnosis API");
    next();
});

router.route("/")
    .post(function (req,res) {
        var diagnosis = new Diagnosis();
        diagnosis = req.body;

        diagnosis.save(function (err) {
            if(err)
                res.send(err);

            res.json({message: "Diagnosis created! name = " + req.body.title});
        });
    })
    .get(function (req,res) {
        Diagnosis.find(function (err,diagnosiss) {
            if(err)
                res.send(err);
            res.json(diagnosiss);
        })
    });

router.route("/:id")
    .get(function (req,res) {
        Diagnosis.findById(req.params.id,function (err,diagnosis) {
            if(err)
                res.send(err);
            res.json(diagnosis);
        });
    })
    .put(function (req,res) {
        Diagnosis.findById(req.params.id,function (err,diagnosis) {
            if(err)
                res.send(err);

            diagnosis.name = req.body.name;
            diagnosis.id = req.body.id;

            console.log("updating... " + req.params.id)
            diagnosis.save(function (err) {
                if(err)
                    res.send(err);
                res.json({message : " Diagnosis updated to name = " + req.body.name});
            })
        })
    })
    .delete(function (req,res) {
        Diagnosis.remove({
            _id:req.params.id
        },function (err) {
            if(err)
                res.send(err);
            res.json({message: "Diagnosis deleted : " + req.params.id})
        });
    });

module.exports = router;