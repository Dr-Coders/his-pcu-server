/**
 * Created by Nirmal on 7/1/2017.
 */

const express = require("express");
const Drug = require("../models/drug");
const router = express.Router();

router.use(function (req, res, next) {
    console.log("Accessing Drug API");
    next();
});

router.route("/")
    .post(function (req, res) {
        var drug = new Drug();
        drug.name = req.body.name;
        drug.price = req.body.price;
        drug.quantitypertablet = req.body.quantitypertablet;
        drug.manufacture = req.body.manufacture;
        
        drug.save(function (err) {
            if (err)
                res.send(err);

            res.json({message: "Drug created! name = " + req.body.name});
        });
    })
    .get(function (req, res) {
        Drug.find(function (err,drug) {
            if(err)
                res.send(err);
            console.log("Drug : " + drug);
            res.json(drug);
        })
    });

router.route("/:id")
    .get(function (req, res) {
        Drug.findById(req.params.id, function (err, drug) {
            if (err)
                res.send(err);
            res.json(drug);
        });
    })
    .put(function (req, res) {
        Drug.findById(req.params.id, function (err, drug) {
            if (err)
                res.send(err);
            drug.name = req.body.name;
            drug.price = req.body.price;
            drug.quantitypertablet = req.body.quantitypertablet;
            drug.manufacture = req.body.manufacture;

            console.log("updating... " + req.params.id);
            drug.save(function (err) {
                if (err)
                    res.send(err);
                res.json({message: " Drug updated to name = " + req.body.name});
            })
        })
    })
    .delete(function (req, res) {
        Drug.remove({
            _id: req.params.id
        }, function (err) {
            if (err)
                res.send(err);
            res.json({message: "Drug deleted : " + req.params.id})
        });
    });

module.exports = router;