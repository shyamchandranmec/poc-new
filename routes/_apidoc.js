/**
 * Created by shyam on 23/03/16.
 */
/**
 *
 * @api {get} / List all users
 * @apiVersion 0.0.1
 * @apiGroup users
 * @apiSuccess {String} status Returns all users in the db
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * [
 *  {
 *      "_id": "56b5bdfda882da2d331dbb89",
 *      "name": "Shyam",
 *      "email": "s@s.com"
 * }
 * ]
 * @apiError UserNotFound The id of the User was not found.
 */