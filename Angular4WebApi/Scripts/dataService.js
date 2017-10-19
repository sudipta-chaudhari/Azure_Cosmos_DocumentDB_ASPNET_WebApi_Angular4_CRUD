"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/map");
var InventoryService = (function () {
    function InventoryService(http) {
        this.http = http;
    }
    //public getAllProducts = (): Observable<any> => {
    //    return this.http.get('/api/Product/GetProducts')
    //        .map((response: Response) => <any>response.json())
    //}
    InventoryService.prototype.getAllProducts = function () {
        return this.http.get('/api/Product/GetProducts').map(function (res) { return res.json(); });
    };
    InventoryService.prototype.addProduct = function (product) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify(product);
        return this.http.post('/api/Product/', body, options).map(function (res) { return res.json(); });
    };
    InventoryService.prototype.updateProduct = function (product) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify(product);
        return this.http.put('/api/Product/' + product.Id, body, options).map(function (res) { return res.json(); });
    };
    InventoryService.prototype.deleteProduct = function (product) {
        return this.http.delete('/api/Product/' + product.Id);
    };
    return InventoryService;
}());
InventoryService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], InventoryService);
exports.InventoryService = InventoryService;
//# sourceMappingURL=dataService.js.map