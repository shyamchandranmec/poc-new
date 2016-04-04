/**
 * Created by shyam on 19/03/16.
 */

"use strict";

let ConnectRedis =  require('connect-redis');
let session = require('express-session');
let RedisStore = ConnectRedis(session);
let Redis =  require('ioredis');
let redis = new Redis();



module.exports = app => {
    app.use(session({
        /*store: new RedisStore({
         client: redis
         }),*/
        secret: 'ssshhhhh',
        resave: true,
        saveUninitialized: true
    }));
}