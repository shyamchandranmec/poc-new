/**
 * Created by shyam on 19/03/16.
 */

"use strict";
let passport  =   require('passport');

module.exports = app  => {
    app.use(passport.initialize());
    //app.use(passport.session());
}