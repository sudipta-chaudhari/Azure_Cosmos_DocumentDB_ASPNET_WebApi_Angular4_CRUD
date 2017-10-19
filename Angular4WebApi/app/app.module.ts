/// <reference path="../typings/index.d.ts" />
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { routes } from './app.router';
import { AppComponent } from "./app.component";
//For Reactive Forms Validation
import { ReactiveFormsModule } from '@angular/forms';
//PrimeNG modules
import { DataTableModule, SharedModule, ButtonModule, DialogModule } from 'primeng/primeng';
//Routed Components
import { HomeComponent } from './home/home.component';
import { QRCodeComponent } from './qrcode/qrcode.component';
import { UploadComponent } from './upload/upload.component';
import { ProductComponent } from './product/product.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        routes,
        //PrimeNG
        DataTableModule, SharedModule, ButtonModule, DialogModule,
        BrowserAnimationsModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        QRCodeComponent,
        UploadComponent,
        ProductComponent
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }