import { Component, ViewChild } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { UploadedFile } from '../model/uploadedfile';

@Component({
    templateUrl: './app/upload/upload.component.html'
})

export class UploadComponent {
    errorMessage: string;
    filesToUpload: Array<File>;
    selectedFileNames: string[] = [];
    public isLoadingData: Boolean = false;
    @ViewChild('fileUpload') fileUploadVar: any;
    uploadResult: any;
    res: Array<string>;

    constructor(private http: Http, private router: Router) {
        this.errorMessage = "";
        this.filesToUpload = [];
        this.selectedFileNames = [];
        this.uploadResult = "";
    }
    
    fileChangeEvent(fileInput: any)
    {
        //Clear Uploaded Files result message
        this.uploadResult = "";
        this.filesToUpload = <Array<File>>fileInput.target.files;

        for (let i = 0; i < this.filesToUpload.length; i++)
        {
            this.selectedFileNames.push(this.filesToUpload[i].name);
        }
    }

    cancelUpload()
    {
        this.filesToUpload = [];
        this.fileUploadVar.nativeElement.value = "";
        this.selectedFileNames = [];
        this.uploadResult = "";
        this.errorMessage = "";
    }

    upload()
    {
        if (this.filesToUpload.length == 0)
        {
            alert('Please select at least 1 PDF files to upload!');
        }
        else if (this.filesToUpload.length > 3) {
            alert('Please select a maximum of 3 PDF files to upload!');
        }
        else
        {
            if (this.validatePDFSelectedOnly(this.selectedFileNames))
            {
                this.uploadFiles();
            }
        }
    }

    validatePDFSelectedOnly(filesSelected: string[])
    {
        for (var i = 0; i < filesSelected.length; i++)
        {
            if (filesSelected[i].slice(-3).toUpperCase() != "PDF")
            {
                alert('Please selecte PDF files only!');
                return false;
            }
            else {
                return true;
            }
        }
    }

    uploadFiles()
    {
        this.uploadResult = "";

        if (this.filesToUpload.length > 0)
        {
            this.isLoadingData = true;

            let formData: FormData = new FormData();

            for (var i = 0; i < this.filesToUpload.length; i++)
            {
                formData.append('uploadedFiles', this.filesToUpload[i], this.filesToUpload[i].name);
            }

            let apiUrl = "/api/Upload/UploadFiles";

            this.http.post(apiUrl, formData)
                .map((res: Response) => res.json())
                .subscribe
                (
                    data => {
                        this.uploadResult = data;
                        this.errorMessage = "";
                    },
                    err => {
                        console.error(err);
                        this.errorMessage = err;
                        this.isLoadingData = false;
                    },
                    () => {
                        this.isLoadingData = false,
                            this.fileUploadVar.nativeElement.value = "";
                        this.selectedFileNames = [];
                        this.filesToUpload = [];
                    }
                );
        }
    }
}
