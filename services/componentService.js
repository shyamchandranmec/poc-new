/**
 * Created by shyam on 09/02/16.
 */

"use strict";
var componentModel = require("../models/component");

exports.getAllComponents = function () {
    return componentModel.getAllComponents();
}