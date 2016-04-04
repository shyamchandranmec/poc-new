/**
 * Created by shyam on 19/03/16.
 */

"use strict";
let morgan  = require('morgan');
let cookieParser  = require('cookie-parser');
let bodyParser  = require('body-parser');
let favicon  = require('serve-favicon');
let path  = require('path');
var logJs = require ("log4js");


module.exports = app => {
    // view engine setup
    /*logJs.configure({
        replaceConsole: false
    })*/
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'ejs');
    app.set("json spaces", 4);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cookieParser('cookieSecret'));

}