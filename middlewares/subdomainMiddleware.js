/**
 * Created by shyam on 19/03/16.
 */

"use strict";
let subDomainHandler = require('express-subdomain-handler');
let express = require('express');
let path = require('path');

module.exports = app => {
    app.use("/subdomains/",express.static(path.join(__dirname, 'public')));
    app.use( subDomainHandler({ baseUrl:process.env.DOMAIN_NAME , prefix: 'subdomains', logger: true }) );
}

