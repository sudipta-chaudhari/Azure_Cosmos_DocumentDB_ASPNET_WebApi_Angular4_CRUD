import { Component } from '@angular/core';
import { Http, RequestOptions, Headers, Response, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';
import { Router } from '@angular/router';

@Component({
    templateUrl: './app/qrcode/qrcode.component.html'
})

export class QRCodeComponent
{
    b64b64toBlob: any;
    base64encodedQRImgString: any;
    qrResult: any;
    errorMessage: string;
    public isLoadingData: Boolean = false;
    blobPDFUri: any;
    
    constructor(private http: Http)
    {
        this.qrResult = "";
        this.errorMessage = "";
    }

    generateQRCode(fn)
    {
        //Clear previous QR Code result
        this.base64encodedQRImgString = "";
        this.qrResult = "";

        if (fn == '')
        {
            alert('Please enter File Name to generate QR Code');
        }
        else
        {
            //Generate QR Code
            this.getQRCode(fn);

        }  
    }
    getQRCode(filename: string)
    {
        let apiUri = "/api/QRCode/GetQRCode";

        this.blobPDFUri = "https://myblob.blob.core.windows.net/myblobcontainer/" + encodeURIComponent(filename) + "?st=2017-04-08T00%3A01%3A00Z&se=2099-12-31T23%3A59%3A00Z&sp=rwdl&sv=2015-12-11&sr=c&sig=nP...U%3D";

        // Parameters obj-
        let params: URLSearchParams = new URLSearchParams();
        params.set('content', this.blobPDFUri);
        params.set('alt', 'QR Code');
        params.set('height', '150');
        params.set('width', '150');
        params.set('margin', '0');

        let requestOptions = new RequestOptions();
        requestOptions.params = params;

        this.isLoadingData = true;

        this.http.get(apiUri, requestOptions)
            .map((res: Response) => res.json())
            .subscribe
            (
                data =>
                {
                    this.base64encodedQRImgString = data;
                    console.log(data);
                    this.qrResult = "<img src='data:image/png;base64," + data + "' />";
                    this.errorMessage = "";
                },
                err =>
                {
                    console.error(err);
                    this.errorMessage = err;
                    this.isLoadingData = false;
                },
                () =>
                {
                    this.isLoadingData = false
                }
            );
    }

    downloadQRCode()
    {
        var byteCharacters = atob(this.base64encodedQRImgString);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        var blob: Blob;

        try
        {
            blob = new Blob([byteArray], { type: "image/png" });
            
            if (window.navigator.msSaveOrOpenBlob)  // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
            {
                window.navigator.msSaveBlob(blob, 'QR.png');
            }
            else
            {
                var a = window.document.createElement("a");
                a.href = window.URL.createObjectURL(blob);
                a.download = "QR.png";
                document.body.appendChild(a);
                a.click();  // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
                document.body.removeChild(a);
            }
        }
        catch (err)
        {
            //Blob not supported for Safari
            window.open('data:image/png;base64,' + this.base64encodedQRImgString);
        }
    }
}