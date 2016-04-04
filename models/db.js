/**
 * Created by shyam on 13/10/15.
 */

"use strict"
var app = require("express")();
var mongoose = require('mongoose');
var logger = require('log4js').getLogger();

var username = process.env.MONGO_USER_NAME;
var password = process.env.MONGO_PASSWORD;
var host = process.env.MONGO_HOST;
var port = process.env.MONGO_PORT;
var db = process.env.MONGO_DATABASE;

var dbURI = `mongodb://${username}:${password}@${host}:${port}/${db}`;

mongoose.connect(dbURI,{server: { poolSize: 4 }});
mongoose.Promise = require("q").Promise;

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
   // logger.info('Mongoose connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
    logger.error('Mongoose  connection error: ' + err);
    logger.error(dbURI);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    logger.warn('Mongoose  connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        logger.warn('Mongoose  connection disconnected through app termination');
        process.exit(0);
    });
});

