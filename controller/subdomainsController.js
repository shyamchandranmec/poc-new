/**
 * Created by shyam on 09/02/16.
 */


"use strict";


let componentService  = require("../services/componentService");
let restaurantService  = require("../services/restaurantService");
let restaurantPage  = require("../tags/components/restaurant-page.tag");

let logger = require("log4js").getLogger();
let riot  = require("riot");
let requireDir  = require("require-dir");
let tags = requireDir('../tags', {recurse: true});
let configurePage  = require("../tags/configure-page.tag");

exports.sendPage = function (req, res, next) {
    logger.info("Sending page");
    let domainName = req.params.domainName;
    restaurantService.findBySlug(domainName).then((restaurant) => {
        let html = riot.render(restaurantPage, restaurant);
        logger.info(html);
        return res.render("restaurant-page", {
            title: "Home",
            output: html,
            data: restaurant
        });
    }).fail(err => next(err,req, res, next))
};
exports.configureWebsite = function (req, res, next) {
    logger.info("Configuring website");
    let domainName = req.params.domainName;
    restaurantService.findBySlug(domainName).then((restaurant) => {
        componentService.getAllComponents().then(components => {
            let data = {
                restaurant: restaurant,
                components: components
            };
            let html = riot.render(configurePage, data);
            logger.info(html);
            return res.render("configure", {
                title: data.title,
                output: html,
                data: data
            });
        })
    }).fail(err => next(err, req, res, next))

};

exports.addSelectedComponent = function (req, res, next) {
    logger.info("Adding selected component");
    let componentDetails = req.body;
    let restaurantId = req.body.restaurantId;
    delete componentDetails.restaurantId;
    restaurantService.addSelectedComponent(restaurantId, componentDetails).then(result => {
        res.json(result)
    }).fail(err => next(err, req, res, next));
};




