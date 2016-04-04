/**
 * Created by shyam on 09/02/16.
 */

"use strict"
let  express = require('express');
let router = express.Router();
let componentsController  = require("../controller/componentsController");


router.route("/")
    .get((req, res, next) => {
        componentsController.getAllComponents(req, res, next);
    });

module.exports = router;
