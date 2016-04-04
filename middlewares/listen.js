/**
 * Created by shyam on 22/03/16.
 */

"use strict";

let logger = require("log4js").getLogger();


module.exports = (app) => {
    let test = false;
    let port = process.env.PORT || '3000';
    if(!test) {
        app.listen( port, () => {
            logger.info("Server started on port " + port);
        })
    }

};