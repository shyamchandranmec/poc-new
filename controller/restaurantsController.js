/**
 * Created by shyam on 08/02/16.
 */

"use strict"


let sessionHandler  = require("../auth/sessionhandler");
let slugify  = require("slug");
let restaurantService  = require("../services/restaurantService");



exports.addRestaurant = function (req, res, next) {
    let name = req.body.name;
    let restaurantDetails = {
        name: name,
        slug:slugify(name,{lower:true})
    };
    restaurantService.addRestaurant(restaurantDetails).then((result) => {
        res.json(result)
    }).fail((err) => next(err, req, res, next))
}