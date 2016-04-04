"use strict"
let express  = require('express');
let router = express.Router();
let indexController = require("../controller/indexController");

router.route("/")
    .get((req, res, next) => indexController.getLoginPage(req, res, next))
    .post((req, res, next) => indexController.localAuthentication(req, res, next));

router.route("/token")
    .post((req, res, next) => {
        let app = require("../app");
        let auth  = require("../auth/authentication")(app);
        return auth.generateJwtToken(req, res, next);
    })

router.route("/login")
    .get((req, res, next) => {
        indexController.getLoginPage(req, res, next)
    })
    .post((req, res, next) => indexController.localAuthentication(req, res, next));


router.route("/logout")
    .get((req, res, next) => {
        req.session.destroy();
        req.logout();
        res.redirect('/');
    });

router.route("/status")
    .get((req, res, next) => {
        indexController.getStatus(req, res, next);
    })

router.route("/static-one")
    .get((req, res, next) => {
        indexController.getStaticPageOne(req, res, next);
    });

router.route("/static-two")
    .get((req, res, next) => {
        indexController.getStaticPageTwo(req, res, next);
    });

module.exports = router;
