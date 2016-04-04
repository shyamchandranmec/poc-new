/**
 * Created by shyam on 13/10/15.
 */

var userModel = require("../models/user");
exports.addUser = function (data) {
    return userModel.addUser(data);
}

exports.getAllUsers = function () {
    return userModel.getAllUsers();
};

exports.findUserByEmail = function (email) {
    return userModel.findUserByEmail(email);
}