"use strict";

let express = require('express');
let router = express.Router();
let userServices = require("../services/userService");
/* GET users listing. */


router.route("/")
    .all((req, res, next) => {
        let app = require("../app");
        next();
        //return app.auth.authentication.authenticate()(req, res, next);
    })
/**
 * @apiDefine MyError
 * @apiError UserNotFound The <code>id</code> of the User was not found.
 */
/**
 * @apiDefine admin User access only
 * This optional description belong to to the group admin.
 */

/**
 *
 * @api {get} / List all users
 * @apiVersion 0.0.2
 * @apiError (4xx) {json }  usernotfounda the descriptionX
 * @apiError (3xx) {json }  usernotfoundB the descriptionY
 * @apiHeader {String} JWT JWT token.
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "JWT xyz.$sdfds.333dfd"
 *     }
 * @apiErrorExample {json} usernotfounda:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 * @apiErrorExample {json} usernotfoundB:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 * @apiGroup users
 * @apiPermission admin
 * @apiSuccess {String} status Returns all users in the db
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * [
 *  {
 *      "_id": "56b5bdfda882da2d331dbb89",
 *      "name": "Shyam",
 *      "email": "s@s.com",
 *      "handle" "@abc"
 * }
 * ]
 */
    .get(function (req, res, next) {
        userServices.getAllUsers().then(function (result) {
            res.send(result)
        }).fail(function (err) {
            next(err, req, res, next);
        })
    })
    .post(function (req, res, next) {
        userServices.addUser(req.body).then(function (result) {
            res.send(result)
        }).fail(function (err) {
            next(err, req, res, next);
        })
    });

module.exports = router;
