/**
 * Created by shyam on 06/02/16.
 */

"use strict"
let riot  = require("riot");
let loginPage  = require("../tags/login-page.tag");
let staticPageOne  = require("../tags/static-one.tag");
let staticPageTwo  = require("../tags/static-two.tag");
let homePage  = require("../tags/home-page.tag");
let sessionHandler  = require("../auth/sessionhandler");
let componentService  = require("../services/componentService");
let requireDir  = require('require-dir');
let tags = requireDir('../tags', {recurse: true});


exports.getLoginPage = function (req, res, next) {

    if (sessionHandler.isLoggedIn(req)) {
        let email = sessionHandler.getSessionUserDetails(req).email;
        console.log(email);
        componentService.getAllComponents().then(components => {
            let data = {
                email: email,
                components: components
            };
            let html = riot.render(homePage, data);
            return res.render("home", {
                title: data.title,
                output: html,
                data: data
            });
        })
    } else {
        let data = {};
        let html = riot.render(loginPage, data);
        return res.render("index", {
            title: data.title,
            output: html,
            data: data
        });
    }
};


/**
 * Do local authentication
 * @param req
 * @param res
 * @param next
 */
exports.localAuthentication = function (req, res, next) {
    return app.auth.authentication.authenticate();
};



/**
 * render static one page
 * @param req
 * @param res
 * @param next
 */
exports.getStaticPageOne = function (req, res, next) {
    let data = {
        info: "Static page one"
    };
    let html = riot.render(staticPageOne, data);
    console.log(html)
    return res.render("staticOne", {
        title: data.title,
        output: html,
        data: data
    });
};


/**
 * Render static page two
 * @param req
 * @param res
 * @param next
 * @returns {String}
 */
exports.getStaticPageTwo = function (req, res, next) {
    let data = {
        info: "Static page two"
    };
    let html = riot.render(staticPageTwo, data);
    return res.render("staticTwo", {
        title: data.title,
        output: html,
        data: data
    });
};


exports.getStatus = (req, res, next) => {
    res.json({
        status: "abc"
    })
}