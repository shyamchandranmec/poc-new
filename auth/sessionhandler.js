/**
 * Created with IntelliJ IDEA.
 * User: shyam
 * Date: 21/2/15
 * Time: 7:59 PM
 * To change this template use File | Settings | File Templates.
 */

"use strict"

exports.getSessionUserDetails = function getSession(req)   {
    return req.session;
}

function getSessionUserDetails(req)   {
    return req.user;
}

exports.isLoggedIn = function isLoggedIn(req) {
    let user = getSessionUserDetails(req);
    if ((user == undefined) || (user == null)) {
       return false
    } else {
        return true;
    }
}

exports.getPassportSession = function getPassportSession(req)   {
    return req.session.passport;
}

exports.getUserRid = function getSession(req)   {
    return req.user["@rid"];
};
exports.getSessionUserDetails = getSessionUserDetails;

