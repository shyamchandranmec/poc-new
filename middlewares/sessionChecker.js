/**
 * Created by shyam on 19/09/15.
 */

import sessionHandler from "../auth/sessionhandler";

module.exports = app => {
    function sessionChecker(req, res, next) {
        var url = req.url;
        if (!(url.indexOf("/login") == 0)) {
            if ((!sessionHandler.getSessionUserDetails(req))) {
                res.redirect('/login');
            } else {
                next();
            }
        } else {
            next();
        }
    }
    app.use(sessionChecker)
}


