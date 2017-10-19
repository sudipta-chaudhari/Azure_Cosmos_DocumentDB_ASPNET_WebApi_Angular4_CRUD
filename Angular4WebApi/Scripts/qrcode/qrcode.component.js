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
require("rxjs/Rx");
var QRCodeComponent = (function () {
    function QRCodeComponent(http) {
        this.http = http;
        this.isLoadingData = false;
        this.qrResult = "";
        this.errorMessage = "";
    }
    QRCodeComponent.prototype.generateQRCode = function (fn) {
        //Clear previous QR Code result
        this.base64encodedQRImgString = "";
        this.qrResult = "";
        if (fn == '') {
            alert('Please enter File Name to generate QR Code');
        }
        else {
            //Generate QR Code
            this.getQRCode(fn);
        }
    };
    QRCodeComponent.prototype.getQRCode = function (filename) {
        var _this = this;
        var apiUri = "/api/QRCode/GetQRCode";
        this.blobPDFUri = "https://myblob.blob.core.windows.net/myblobcontainer/" + encodeURIComponent(filename) + "?st=2017-04-08T00%3A01%3A00Z&se=2099-12-31T23%3A59%3A00Z&sp=rwdl&sv=2015-12-11&sr=c&sig=nP...U%3D";
        // Parameters obj-
        var params = new http_1.URLSearchParams();
        params.set('content', this.blobPDFUri);
        params.set('alt', 'QR Code');
        params.set('height', '150');
        params.set('width', '150');
        params.set('margin', '0');
        var requestOptions = new http_1.RequestOptions();
        requestOptions.params = params;
        this.isLoadingData = true;
        this.http.get(apiUri, requestOptions)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.base64encodedQRImgString = data;
            console.log(data);
            _this.qrResult = "<img src='data:image/png;base64," + data + "' />";
            _this.errorMessage = "";
        }, function (err) {
            console.error(err);
            _this.errorMessage = err;
            _this.isLoadingData = false;
        }, function () {
            _this.isLoadingData = false;
        });
    };
    QRCodeComponent.prototype.downloadQRCode = function () {
        var byteCharacters = atob(this.base64encodedQRImgString);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        var blob;
        try {
            blob = new Blob([byteArray], { type: "image/png" });
            if (window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveBlob(blob, 'QR.png');
            }
            else {
                var a = window.document.createElement("a");
                a.href = window.URL.createObjectURL(blob);
                a.download = "QR.png";
                document.body.appendChild(a);
                a.click(); // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
                document.body.removeChild(a);
            }
        }
        catch (err) {
            //Blob not supported for Safari
            window.open('data:image/png;base64,' + this.base64encodedQRImgString);
        }
    };
    return QRCodeComponent;
}());
QRCodeComponent = __decorate([
    core_1.Component({
        templateUrl: './app/qrcode/qrcode.component.html'
    }),
    __metadata("design:paramtypes", [http_1.Http])
], QRCodeComponent);
exports.QRCodeComponent = QRCodeComponent;
//# sourceMappingURL=qrcode.component.js.map