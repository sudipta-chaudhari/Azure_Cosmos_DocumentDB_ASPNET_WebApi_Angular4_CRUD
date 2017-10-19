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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var product_1 = require("../model/product");
var dataService_1 = require("../service/dataService");
//For Reactive Forms Validation
var forms_1 = require("@angular/forms");
var ValidationService_1 = require("../service/ValidationService");
var ProductComponent = (function () {
    function ProductComponent(http, productService, fb) {
        this.http = http;
        this.productService = productService;
        this.fb = fb;
        this.products_error = false;
        this.product = new product_1.Product();
        this.isAdd = false;
        this.isEdit = false;
        this.isLoadingData = false;
        this.displayAddDialog = false;
        this.displayEditDialog = false;
    }
    ProductComponent.prototype.ngOnInit = function () {
        this.addProductFG = this.fb.group({
            'name': [null, [forms_1.Validators.required, ValidationService_1.ValidationService.nospaceValidator, forms_1.Validators.minLength(2), forms_1.Validators.maxLength(10)]],
            'category': [null, [forms_1.Validators.required, ValidationService_1.ValidationService.nospaceValidator, forms_1.Validators.minLength(2), forms_1.Validators.maxLength(5)]],
            'price': [null, forms_1.Validators.required]
        });
        this.editProductFG = this.fb.group({
            'name': [null, [forms_1.Validators.required, ValidationService_1.ValidationService.nospaceValidator, forms_1.Validators.minLength(2), forms_1.Validators.maxLength(10)]],
            'category': [null, [forms_1.Validators.required, ValidationService_1.ValidationService.nospaceValidator, forms_1.Validators.minLength(2), forms_1.Validators.maxLength(5)]],
            'price': [null, forms_1.Validators.required]
        });
        this.isAdd = true;
        this.isEdit = false;
        //Get Product List on Page Load
        this.getAllProducts();
    };
    ProductComponent.prototype.getAllProducts = function () {
        var _this = this;
        this.isLoadingData = true;
        this.productService.getAllProducts()
            .subscribe(function (data) {
            _this.products = data;
        }, function (error) {
            console.log(error),
                _this.isLoadingData = false;
        }, function () {
            _this.isLoadingData = false;
        });
    };
    ProductComponent.prototype.editProduct = function (_product) {
        //Show edit dialog
        this.displayEditDialog = true;
        this.isEdit = true;
        this.isAdd = false;
        //this.product = { Id: _product.Id, Name: _product.Name, Category: _product.Category, Price: _product.Price };
        this.product = { id: _product.id, Name: _product.Name, Category: _product.Category, Price: _product.Price };
    };
    ProductComponent.prototype.updateProduct = function (product) {
        var _this = this;
        this.productService.updateProduct(product).subscribe(function (data) {
            // refresh the list
            _this.getAllProducts();
            alert('Product Updated Successfully!');
            _this.editSuccess = true;
            _this.displayEditDialog = false; //Hide edit dialog after save
            _this.product = new product_1.Product();
            _this.isEdit = false;
            _this.isAdd = true;
            return true;
        }, function (error) {
            console.error("Error saving Product!");
            _this.editSuccess = false;
            alert(error);
        });
    };
    ProductComponent.prototype.deleteProduct = function (_product) {
        var _this = this;
        if (confirm("Are you sure you want to delete product named '" + _product.Name + "'?")) {
            //this.productService.deleteProduct(_product).subscribe(
            this.productService.deleteProduct(_product.id).subscribe(function (data) {
                // refresh the list
                alert('Product Deleted Successfully!');
                _this.getAllProducts();
                return true;
            }, function (error) {
                _this.isLoadingData = false;
                console.error("Error deleting Product!");
                alert(error);
            }, function () {
                _this.isLoadingData = false;
            });
        }
    };
    //deleteProduct(_product: Product) {
    //    if (confirm("Are you sure you want to delete product?")) {
    //        this.productService.deleteProduct(_product.id).subscribe(
    //            data => {
    //                // refresh the list
    //                alert('Product Deleted Successfully!');
    //                this.getAllProducts();
    //                return true;
    //            },
    //            error => {
    //                this.isLoadingData = false;
    //                console.error("Error deleting Product!");
    //                alert(error);
    //            },
    //            () => {
    //                this.isLoadingData = false;
    //            }
    //        );
    //    }
    //}
    ProductComponent.prototype.clearData = function () {
        this.product = new product_1.Product();
        this.isEdit = false;
        this.isAdd = true;
        this.displayAddDialog = false;
        this.displayEditDialog = false;
    };
    ProductComponent.prototype.addProduct = function (product) {
        var _this = this;
        this.isAdd = true;
        this.isEdit = false;
        this.productService.addProduct(product).subscribe(function (data) {
            // refresh the list
            _this.getAllProducts();
            alert('Product Added Successfully!');
            _this.addSuccess = true;
            _this.displayAddDialog = false; //Hide add dialog after save
            _this.product = new product_1.Product();
            return true;
        }, function (error) {
            console.error("Error saving Product!");
            _this.addSuccess = false;
            alert(error);
        });
    };
    ProductComponent.prototype.addProductDialog = function () {
        this.displayAddDialog = true;
    };
    return ProductComponent;
}());
ProductComponent = __decorate([
    core_1.Component({
        selector: 'app-product',
        templateUrl: './app/product/product.component.html',
        styleUrls: [
            "../../node_modules/primeng/resources/primeng.min.css",
            "../../node_modules/primeng/resources/themes/omega/theme.css",
        ],
        encapsulation: core_1.ViewEncapsulation.None,
        providers: [dataService_1.InventoryService]
    }),
    __metadata("design:paramtypes", [http_1.Http, dataService_1.InventoryService, forms_1.FormBuilder])
], ProductComponent);
exports.ProductComponent = ProductComponent;
//# sourceMappingURL=product.component.js.map