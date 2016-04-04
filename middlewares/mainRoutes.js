/**
 * Created by shyam on 19/03/16.
 */

"use strict";
let logger = require("log4js").getLogger();

module.exports = app => {
    let routesList = ["", "users","restaurants","components","subdomains"];
    for(let route of routesList) {
        logger.info("Adding route /" + route);
        app.use('/' + route, require("../routes/" + route))
    }
}