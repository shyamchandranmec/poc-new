"use strict";
let express = require("express");
const app = express();
let consign = require("consign");

consign()
    .include("libs/config.js")
    .include("models/db.js")
    .include("middlewares/basicSettings.js")
    .include("middlewares/session.js")
    .include("middlewares/passportMiddleware.js")
    .include("middlewares/staticResources.js")
    .include("middlewares/subdomainMiddleware.js")
    .include("auth/authentication.js")
    // .include("middlewares/sessionChecker.js")
    .include("middlewares/mainRoutes.js")
    .include("middlewares/subdomainRoutes.js")
    .include("middlewares/errorHandler.js")
    .include("middlewares/listen.js")
    .into(app);




module.exports = app;
