/**
 * Created by shyam on 08/02/16.
 */

"use strict"
var restaurantModel = require("../models/restaurant");

exports.addRestaurant = function (restaurantDetails) {
    return restaurantModel.addRestaurant(restaurantDetails);
};

exports.findBySlug = function (slug) {
    return restaurantModel.findBySlug(slug);

}

exports.addSelectedComponent = function (restaurantId, componentDetails) {
    let restaurantDetails = {
        _id: restaurantId
    };
    return restaurantModel.addSelectedComponent(restaurantDetails,componentDetails);
};

exports.getSelectedComponents = function (restaurantDetails) {
    return restaurantModel.getSelectedComponent(restaurantDetails);
}