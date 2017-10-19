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
var router_1 = require("@angular/router");
var UploadComponent = (function () {
    function UploadComponent(http, router) {
        this.http = http;
        this.router = router;
        this.selectedFileNames = [];
        this.isLoadingData = false;
        this.errorMessage = "";
        this.filesToUpload = [];
        this.selectedFileNames = [];
        this.uploadResult = "";
    }
    UploadComponent.prototype.fileChangeEvent = function (fileInput) {
        //Clear Uploaded Files result message
        this.uploadResult = "";
        this.filesToUpload = fileInput.target.files;
        for (var i = 0; i < this.filesToUpload.length; i++) {
            this.selectedFileNames.push(this.filesToUpload[i].name);
        }
    };
    UploadComponent.prototype.cancelUpload = function () {
        this.filesToUpload = [];
        this.fileUploadVar.nativeElement.value = "";
        this.selectedFileNames = [];
        this.uploadResult = "";
        this.errorMessage = "";
    };
    UploadComponent.prototype.upload = function () {
        if (this.filesToUpload.length == 0) {
            alert('Please select at least 1 PDF files to upload!');
        }
        else if (this.filesToUpload.length > 3) {
            alert('Please select a maximum of 3 PDF files to upload!');
        }
        else {
            if (this.validatePDFSelectedOnly(this.selectedFileNames)) {
                this.uploadFiles();
            }
        }
    };
    UploadComponent.prototype.validatePDFSelectedOnly = function (filesSelected) {
        for (var i = 0; i < filesSelected.length; i++) {
            if (filesSelected[i].slice(-3).toUpperCase() != "PDF") {
                alert('Please selecte PDF files only!');
                return false;
            }
            else {
                return true;
            }
        }
    };
    UploadComponent.prototype.uploadFiles = function () {
        var _this = this;
        this.uploadResult = "";
        if (this.filesToUpload.length > 0) {
            this.isLoadingData = true;
            var formData = new FormData();
            for (var i = 0; i < this.filesToUpload.length; i++) {
                formData.append('uploadedFiles', this.filesToUpload[i], this.filesToUpload[i].name);
            }
            var apiUrl = "/api/Upload/UploadFiles";
            this.http.post(apiUrl, formData)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.uploadResult = data;
                _this.errorMessage = "";
            }, function (err) {
                console.error(err);
                _this.errorMessage = err;
                _this.isLoadingData = false;
            }, function () {
                _this.isLoadingData = false,
                    _this.fileUploadVar.nativeElement.value = "";
                _this.selectedFileNames = [];
                _this.filesToUpload = [];
            });
        }
    };
    return UploadComponent;
}());
__decorate([
    core_1.ViewChild('fileUpload'),
    __metadata("design:type", Object)
], UploadComponent.prototype, "fileUploadVar", void 0);
UploadComponent = __decorate([
    core_1.Component({
        templateUrl: './app/upload/upload.component.html'
    }),
    __metadata("design:paramtypes", [http_1.Http, router_1.Router])
], UploadComponent);
exports.UploadComponent = UploadComponent;
//# sourceMappingURL=upload.component.js.map