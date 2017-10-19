"use strict";
//import {Injectable} from "@angular/core";
//@Injectable
var ValidationService = (function () {
    function ValidationService() {
    }
    ValidationService.nospaceValidator = function (control) {
        var re = / /;
        if (control.value && control.value.match(re)) {
            return { nospace: true };
        }
    };
    return ValidationService;
}());
exports.ValidationService = ValidationService;
//# sourceMappingURL=ValidationService.js.map