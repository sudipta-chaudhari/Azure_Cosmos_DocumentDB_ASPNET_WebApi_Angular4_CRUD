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
var product_1 = require("./product");
var dataService_1 = require("./dataService");
//For Reactive Forms Validation
var forms_1 = require("@angular/forms");
var ValidationService_1 = require("./ValidationService");
var AppComponent = (function () {
    function AppComponent(productService, fb) {
        this.productService = productService;
        this.fb = fb;
        this.products_error = false;
        this.product = new product_1.Product();
        this.isAdd = false;
        this.isEdit = false;
        this.isLoadingData = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.addProductFG = this.fb.group({
            'name': [null, [forms_1.Validators.required, ValidationService_1.ValidationService.nospaceValidator, forms_1.Validators.minLength(2), forms_1.Validators.maxLength(10)]],
            'category': [null, [forms_1.Validators.required, ValidationService_1.ValidationService.nospaceValidator]],
            'price': [null, forms_1.Validators.required]
        });
        this.isAdd = true;
        this.isEdit = false;
        this.getProducts();
    };
    AppComponent.prototype.getProducts = function () {
        var _this = this;
        this.isLoadingData = true;
        //this.productService
        //    .getAllProducts()
        //    .subscribe(
        //    data => this.products = data,
        //    error => console.log(error),
        //    () => console.log('getAllProducts complete')
        //);
        this.productService
            .getAllProducts()
            .subscribe(function (data) { return _this.products = data; }, function (error) {
            console.log(error),
                _this.isLoadingData = false;
        }, function () {
            console.log('getAllProducts complete');
            _this.isLoadingData = false;
        });
        //this.isLoadingData = false;
    };
    AppComponent.prototype.addProduct = function (product) {
        var _this = this;
        this.isAdd = true;
        this.isEdit = false;
        this.productService.addProduct(product).subscribe(function (data) {
            // refresh the list
            _this.getProducts();
            alert('Product Added Successfully!');
            _this.product = new product_1.Product();
            return true;
        }, function (error) {
            console.error("Error saving Product!");
            //return Observable.throw(error);
            alert(error);
        });
    };
    AppComponent.prototype.editProduct = function (_product) {
        this.isEdit = true;
        this.isAdd = false;
        this.product = { Id: _product.Id, Name: _product.Name, Category: _product.Category, Price: _product.Price };
    };
    AppComponent.prototype.clearData = function () {
        this.product = new product_1.Product();
        this.isEdit = false;
        this.isAdd = true;
    };
    AppComponent.prototype.updateProduct = function (product) {
        var _this = this;
        this.productService.updateProduct(product).subscribe(function (data) {
            // refresh the list
            _this.getProducts();
            alert('Product Updated Successfully!');
            _this.product = new product_1.Product();
            _this.isEdit = false;
            _this.isAdd = true;
            return true;
        }, function (error) {
            console.error("Error saving Product!");
            //return Observable.throw(error);
            alert(error);
        });
    };
    AppComponent.prototype.deleteProduct = function (product) {
        var _this = this;
        if (confirm("Are you sure you want to delete product named '" + product.Name + "'?")) {
            this.productService.deleteProduct(product).subscribe(function (data) {
                // refresh the list
                _this.getProducts();
                alert('Product Deleted Successfully!');
                return true;
            }, function (error) {
                console.error("Error deleting Product!");
                //return Observable.throw(error);
                alert(error);
            });
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        //moduleId: module.id,
        selector: 'my-app',
        templateUrl: './App.html',
        //templateUrl: '../../Views/Product/App.html',
        providers: [dataService_1.InventoryService]
    }),
    __metadata("design:paramtypes", [dataService_1.InventoryService, forms_1.FormBuilder])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.js.map