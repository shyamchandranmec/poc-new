/**
 * Created by shyam on 09/02/16.
 */

"use strict";
var mongoose = require("mongoose");
var Q = require("q");
var logger = require('log4js').getLogger();
var rs = require("../services/responseService");
var componentSchema = mongoose.Schema({
    name: String,
    jsFile: String
});

var Component = mongoose.model('Component', componentSchema);

Component.getAllComponents = function () {
    logger.info(`Listing all components`);
    return Q.promise((resolve, reject) => {
        Component.find().lean().then((components) => {
            logger.info("Got all components");
            resolve(components)
        }).fail(err => {
            logger.error("Error in listing all components");
            logger.error(err);
            let resp = rs.createObject({
                message: `Unable to list components`
            });
            return reject(resp);
        })
    })
};

module.exports = Component;
