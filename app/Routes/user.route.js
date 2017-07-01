/**
 * Created by Nirmal on 6/29/2017.
 */

const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.use(function (req, res, next) {
    console.log("Accessing User API");
    next();
});

router.route("/")
    .post(function (req, res) {
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.role = req.body.role;
        user.object = req.body.object;

        user.save(function (err) {
            if (err)
                res.send(err);

            res.json({message: "User created! name = " + req.body.username});
        });
    })
    .get(function (req,res) {
        User.find(function (err,user) {
            if(err)
                res.send(err);
            console.log("User : " + user);
            res.json(user);
        })
    });

router.route("/:id")
    .get(function (req, res) {
        User.findById(req.params.id, function (err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    })
    .put(function (req, res) {
        User.findById(req.params.id, function (err, user) {
            if (err)
                res.send(err);
            user.username = req.body.username;
            user.password = req.body.password;
            user.role = req.body.role;
            user.object = req.body.object;

            console.log("updating... " + req.params.id);
            user.save(function (err) {
                if (err)
                    res.send(err);
                res.json({message: " User updated to name = " + req.body.username});
            })
        })
    })
    .delete(function (req, res) {
        User.remove({
            _id: req.params.id
        }, function (err) {
            if (err)
                res.send(err);
            res.json({message: "User deleted : " + req.params.id})
        });
    });

module.exports = router;