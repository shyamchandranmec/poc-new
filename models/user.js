/**
 * Created by shyam on 13/10/15.
 */
"use strict";

var mongoose = require("mongoose");
var Q = require("q");
var logger = require('log4js').getLogger();
var rs = require("../services/responseService");
var userSchema = mongoose.Schema({
    name: String,
    email: String
});

var User = mongoose.model('User', userSchema);

User.findUserByEmail = function (email) {
    return Q.promise((resolve, reject) => {
        let data = {
            email: email
        };
        logger.info(`Finding user ${email}`);
        User.findOne(data).exec().then((userDetails) => {
            if(! userDetails) {
                logger.warn(`Unable to find user with email ${email}`);
                return reject(null)
            } else {
                logger.info(`User found with email ${email}`);
                resolve(userDetails.toObject());
            }
        }).fail( (err) => {
            logger.error(err);
            let resp = rs.createObject({
                message: `Can not find user with email ${email}`
            });
            return reject(resp)
        })
    })
};

User.addUser = function (data) {
    logger.info("Saving user");
    return Q.promise((resolve, reject) => {
        var user = new User(data);
        user.save((err, userDetails)  => {
            if (err) {
                logger.error("Error in saving user ", err);
                return reject(err);
            }
            return resolve(userDetails);
        })
    });
};

User.getAllUsers = function () {
    logger.info("Retrieving all users");
    return Q.promise((resolve, reject) => {
        User.find({}, (err, users) => {
            if (err) {
                logger.error("Error in fetching all users ", err);
                return reject(err);
            }
            return resolve(users);
        })
    })
};

module.exports = User;