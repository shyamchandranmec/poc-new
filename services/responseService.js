/**
 * Created by shyam on 08/07/15.
 */

var createObject = function(data) {
    var errorObject = {
        status: data.status || 500,
        error: true,
        message: data.message,
        details: {
            message: data.details || "Some error occurred"
        }
    };
    return errorObject;
};

exports.createObject = createObject;

exports.sendErrorResponse = function(res, err) {
    var errorObject = null;
    if(!err) {
        errorObject =  createObject({});
    } else {
        errorObject = err;
    }
    res.status(errorObject.status).json(errorObject);
};