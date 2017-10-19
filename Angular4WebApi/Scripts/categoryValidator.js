"use strict";
var categoryValidator = (function () {
    function categoryValidator() {
    }
    categoryValidator.categoryStartsWith = function (control) {
        if (control.value.indexOf('') >= 0)
            return { categoryStartsWith: true };
        return null;
    };
    return categoryValidator;
}());
exports.categoryValidator = categoryValidator;
//# sourceMappingURL=categoryValidator.js.map