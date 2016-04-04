/**
 * Created by shyam on 19/03/16.
 */

"use strict";
let logger = require("log4js").getLogger();

module.exports = app => {
    let subDomainRoutesList =["restaurants"];
    for(let route of subDomainRoutesList) {
        logger.info("Adding route /subdomains/:subdomain/" + route);
        app.use('/subdomains/:subdomain/'+ route, require("../routes/" + route))
    }
};