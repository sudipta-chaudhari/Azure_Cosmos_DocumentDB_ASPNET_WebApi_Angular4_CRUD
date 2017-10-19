"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../typings/index.d.ts" />
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_router_1 = require("./app.router");
var app_component_1 = require("./app.component");
//For Reactive Forms Validation
var forms_2 = require("@angular/forms");
//PrimeNG modules
var primeng_1 = require("primeng/primeng");
//Routed Components
var home_component_1 = require("./home/home.component");
var qrcode_component_1 = require("./qrcode/qrcode.component");
var upload_component_1 = require("./upload/upload.component");
var product_component_1 = require("./product/product.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            forms_1.FormsModule,
            forms_2.ReactiveFormsModule,
            app_router_1.routes,
            //PrimeNG
            primeng_1.DataTableModule, primeng_1.SharedModule, primeng_1.ButtonModule, primeng_1.DialogModule,
            animations_1.BrowserAnimationsModule
        ],
        declarations: [
            app_component_1.AppComponent,
            home_component_1.HomeComponent,
            qrcode_component_1.QRCodeComponent,
            upload_component_1.UploadComponent,
            product_component_1.ProductComponent
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map