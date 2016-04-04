/**
 * Created by shyam on 19/03/16.
 */

"use strict";

module.exports = app => {
/*    // catch 404 and forward to error handler

    app.use((req, res, next) => {
        let err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

// error handlers*/

// development error handler
// will print stacktrace
    if (app.get('env') === 'development') {
        app.use( (err, req, res, next) =>{
            res.status(err.status);
            res.json(err);
        });
    }

// production error handler
// no stacktraces leaked to user
    app.use((err, req, res, next) => {
        res.status(err.status);
        delete err.details;
        res.json(err);

    });

}