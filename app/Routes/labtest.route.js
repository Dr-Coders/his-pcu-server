/**
 * Created by Nirmal on 6/29/2017.
 */

const express = require("express");
const Labtest = require("../models/labtest");
const router = express.Router();

router.use(function (req, res, next) {
    console.log("Accessing Labtest API");
    next();
});

router.route("/")
    .post(function (req, res) {
        var labtest = new Labtest(req.body);

        labtest.save(function (err) {
            if (err)
                res.send(err);

            res.json({message: "Labtest created! name = " + req.body.title});
        });
    })
    .get(function (req, res) {
        Labtest
            .find()
            .populate('doctor')
            .populate('labresult')
            .exec(function (err, labtest) {
                if (err)
                    res.send(err);
                console.log("Data : " + labtest);
                res.json(labtest);
            })
    });

router.route("/:id")
    .get(function (req, res) {
        Labtest.findById(req.params.id)
            .populate('doctor')
            .populate('labresult')
            .exec(function (err, labtest) {
                if (err)
                    res.send(err);
                console.log("Data : " + labtest.labtestname);
                res.json(labtest);
            })
    })
    .put(function (req, res) {
        Labtest.findById(req.params.id, function (err, labtest) {
            if (err)
                res.send(err);
            labtest = req.body;

            console.log("updating... " + req.params.id);
            labtest.save(function (err) {
                if (err)
                    res.send(err);
                res.json({message: " Labtest updated to name = " + req.body.title});
            })
        })
    })
    .delete(function (req, res) {
        Labtest.remove({
            _id: req.params.id
        }, function (err) {
            if (err)
                res.send(err);
            res.json({message: "Labtest deleted : " + req.params.id})
        });
    });

module.exports = router;