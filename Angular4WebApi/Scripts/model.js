"use strict";
var Product = (function () {
    function Product(data) {
        Object.assign(this, data);
    }
    Product.prototype.getProducts = function () {
        return this.Name + ", " + this.Category + ", " + this.Price;
    };
    return Product;
}());
exports.Product = Product;
//# sourceMappingURL=model.js.map