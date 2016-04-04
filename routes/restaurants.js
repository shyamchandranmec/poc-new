/**
 * Created by shyam on 08/02/16.
 */

"use strict"
let express = require('express');
let router = express.Router();
let restaurantController = require("../controller/restaurantsController");


router.route("/")
    .post((req, res, next) => {
        restaurantController.addRestaurant(req, res, next)
    });

router.route("/hi")
    .get((req, res, next) => {
        res.json({method: "get"})
    })
    .post((req, res, next) => {
        res.json({
            method: "post"
        })
    })

module.exports = router;
