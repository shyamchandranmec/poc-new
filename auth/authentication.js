/**
 * Created with IntelliJ IDEA.
 * User: shyam
 * Date: 21/2/15
 * Time: 12:13 PM
 * To change this template use File | Settings | File Templates.
 */

"use strict";
let passport = require("passport");
let passportLocal = require("passport-local");
let LocalStrategy = passportLocal.Strategy;
let passportJwt = require("passport-jwt");
let JwtStrategy = passportJwt.Strategy;
let ExtractJwt = passportJwt.ExtractJwt;
let logger = require("log4js").getLogger();
let userService = require("../services/userService");
let jwt = require("jwt-simple");
let _ = require("underscore");
let responseService = require("../services/responseService");

module.exports = app => {
    const cfg = app.libs.config;
    const params = {
        secretOrKey: cfg.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeader()
    };
    passport.use(new JwtStrategy(params, (payload, done) => {
        userService.findUserByEmail(payload.id)
            .then((user) => {
                logger.info("Authentication success");
                done(null, user)
            }).fail(function (err) {
                logger.error("Authentication failed");
                if (err) {
                    logger.error(err);
                    done(null, false)
                } else if (err == null) {
                    done(null, false, {message: 'Incorrect username or password'});
                }
            })
    }));


    passport.use(new LocalStrategy({usernameField: "email"}, function (email, password, done) {
        var email = email;
        userService.findUserByEmail(email)
            .then((user) => {
                done(null, user)
            }).fail((err)  => {
                if (err) {
                    logger.error(err);
                    done(null, false)
                } else if (err == null) {
                    done(null, false, {message: 'Incorrect username or password'});
                }
            })
    }));


    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user)
    });

    return {
        /*authenticate: function () {
         return passport.authenticate('local', {
         successRedirect: "/",
         failureRedirect: "/login"
         })
         }*/
        authenticate: (req, res, next) => {
            return passport.authenticate("jwt", cfg.jwtSession);
        },

        generateJwtToken: (req, res, next) => {
            logger.info("Generating jwt token");
            const email = req.body.email;
            if (_.isEmpty(email)) {
                let errData = {
                    status: 401,
                    error: true,
                    message: "Email is empty"
                }
                let err = responseService.createObject(errData);
                return next(err);
            }
            const cfg = app.libs.config;
            userService.findUserByEmail(email)
                .then((user) => {
                    logger.info(`User with email found ${email}`);
                    const payload = {
                        id: user.email
                    };
                    let token = jwt.encode(payload, cfg.jwtSecret);
                    res.cookie('token', token, {signed: true});
                    res.json({
                        token: token
                    });
                }).fail(function (err) {
                    logger.error(`User with email not found ${email}`);
                    next(err, req, res, next);
                })

        }

    }
}
