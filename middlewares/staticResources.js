/**
 * Created by shyam on 19/03/16.
 */

"use strict";

let express  = require("express");
let path  = require('path');


module.exports = app => {
    app.use(express.static('public'));
    app.use("/tmp/",express.static('/tmp/'));
}