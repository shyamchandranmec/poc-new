/**
 * Created by shyam on 08/02/16.
 */

"use strict"
let mongoose = require("mongoose");
let Q = require("q");
let logger = require('log4js').getLogger();
let rs = require("../services/responseService");
let Schema = mongoose.Schema;

let selectedComponentsSchema = new Schema({
    originalId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Component'
    },
    data: Schema.Types.Mixed
})

let restaurantSchema = new Schema({
    name: String,
    slug: String
});

restaurantSchema.add({
    selectedComponents: [selectedComponentsSchema]
});

selectedComponentsSchema.add({
    name: String
})


let Restaurant = mongoose.model('Restaurant', restaurantSchema);

Restaurant.addRestaurant = function (restaurantDetails) {
    let name = restaurantDetails.name;
    if(!restaurantDetails.selectedComponents) {
        restaurantDetails.selectedComponents = [];
    }
    logger.info(`Creating new restaurant ${name}`);
    return Q.promise((resolve, reject) => {
        let restaurant = new Restaurant(restaurantDetails);
        restaurant.save().then((restaurant)=> {
            logger.info("Restaurant created " + restaurant);
            return resolve(restaurant.toObject())
        }).fail((err) => {
            logger.error("Error in adding restaurant");
            logger.error(err);
            let resp = rs.createObject({
                message: `Can not find user with email ${name}`
            });
            return reject(resp)
        })
    })
};


Restaurant.addSelectedComponent = function (restaurantDetails, componentDetails) {
    return Q.promise((resolve, reject) => {
        logger.info("Adding component to website",restaurantDetails);
        Restaurant.findOne(restaurantDetails).then(restaurant => {
            restaurant.selectedComponents.push(componentDetails);
            return restaurant.save();
        }).then((result) =>{
            logger.info("Component added to page");
            return resolve(result.toObject());
        }).fail((err) => {
            logger.error("Error in adding component"+ err);
            let resp = rs.createObject({
                message: `Error in adding component`
            });
            return reject(resp);
        })
    })
};

Restaurant.findBySlug = function (slug) {
    return Q.promise((resolve, reject) => {
        Restaurant.findOne({
            slug: slug
        }).exec().then((restaurant) =>{
            if(!restaurant) {
                logger.info(`Unable to find restaurant with slug ${slug}`);
                let resp = rs.createObject({
                    message: `Can not find restaurant with slug ${slug}`
                });
                return reject(resp);
            } else {
                logger.info(`Found restaurant with slug ${slug}`);
                resolve(restaurant.toObject());
            }
        })
    })
};

Restaurant.getSelectedComponent = function (restaurantDetails) {
  return Q.promise((resolve, reject) => {
      logger.info("Fetching selected components of website ");
      Restaurant.findOne(restaurantDetails, "selectedComponents").exec().then(restaurant => {
          logger.info("Got all the selected components - length " + restaurant.toObject().selectedComponents.length);
          return resolve(restaurant.toObject());
      }).fail(err => {
          logger.error("Failed to get all the components");
          let resp = rs.createObject({
              message: "Failed to get all the components"
          });
          return reject(resp);
      })

  })
};

module.exports = Restaurant;
