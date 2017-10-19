import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DataTableModule, SharedModule, ButtonModule, DialogModule } from 'primeng/primeng';//PrimeNg
import { Product } from '../model/product';
import { InventoryService } from '../service/dataService';
//For Reactive Forms Validation
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../service/ValidationService';

@Component({
    selector: 'app-product',
    templateUrl: './app/product/product.component.html',
    styleUrls: [
        "../../node_modules/primeng/resources/primeng.min.css",
        "../../node_modules/primeng/resources/themes/omega/theme.css",
    ],
    encapsulation: ViewEncapsulation.None,
    providers: [InventoryService]
})
export class ProductComponent implements OnInit {

    public products: Product[];
    public products_error: Boolean = false;
    public product = new Product();
    public isAdd: Boolean = false;
    public isEdit: Boolean = false;

    public isLoadingData: Boolean = false;

    addProductFG: FormGroup;
    editProductFG: FormGroup;

    addSuccess: boolean;
    editSuccess; boolean;

    displayAddDialog: boolean = false;
    displayEditDialog: boolean = false;

    constructor(private http: Http, private productService: InventoryService, private fb: FormBuilder) {
    }

    ngOnInit() {
        this.addProductFG = this.fb.group({
            'name': [null, [Validators.required, ValidationService.nospaceValidator, Validators.minLength(2), Validators.maxLength(10)]],
            'category': [null, [Validators.required, ValidationService.nospaceValidator, Validators.minLength(2), Validators.maxLength(5)]],
            'price': [null, Validators.required]
        });

        this.editProductFG = this.fb.group({
            'name': [null, [Validators.required, ValidationService.nospaceValidator, Validators.minLength(2), Validators.maxLength(10)]],
            'category': [null, [Validators.required, ValidationService.nospaceValidator, Validators.minLength(2), Validators.maxLength(5)]],
            'price': [null, Validators.required]
        });

        this.isAdd = true;
        this.isEdit = false;

        //Get Product List on Page Load
        this.getAllProducts();
    }

    public getAllProducts() {
        this.isLoadingData = true;

        this.productService.getAllProducts()
            .subscribe(
            data => {
                this.products = data;
            },
            error => {
                console.log(error),
                    this.isLoadingData = false;
            },
            () => {
                this.isLoadingData = false;
            });
    }
    editProduct(_product: Product) {
        //Show edit dialog
        this.displayEditDialog = true;

        this.isEdit = true;
        this.isAdd = false;

        //this.product = { Id: _product.Id, Name: _product.Name, Category: _product.Category, Price: _product.Price };
        this.product = { id: _product.id, Name: _product.Name, Category: _product.Category, Price: _product.Price };
    }
    updateProduct(product) {
        this.productService.updateProduct(product).subscribe(
            data => {
                // refresh the list
                this.getAllProducts();
                alert('Product Updated Successfully!');
                this.editSuccess = true;
                this.displayEditDialog = false;//Hide edit dialog after save

                this.product = new Product();
                this.isEdit = false;
                this.isAdd = true;
                return true;
            },
            error => {
                console.error("Error saving Product!");
                this.editSuccess = false;
                alert(error);
            }
        );
    }
    deleteProduct(_product: Product) {
        if (confirm("Are you sure you want to delete product named '" + _product.Name + "'?")) {
            //this.productService.deleteProduct(_product).subscribe(
            this.productService.deleteProduct(_product.id).subscribe(
                data => {
                    // refresh the list
                    alert('Product Deleted Successfully!');
                    this.getAllProducts();
                    return true;
                },
                error => {
                    this.isLoadingData = false;
                    console.error("Error deleting Product!");
                    alert(error);
                },
                () => {
                    this.isLoadingData = false;
                }
            );
        }
    }
    clearData(): void {
        this.product = new Product();
        this.isEdit = false;
        this.isAdd = true;

        this.displayAddDialog = false;
        this.displayEditDialog = false;
    }
    addProduct(product: Product) {

        this.isAdd = true;
        this.isEdit = false;

        this.productService.addProduct(product).subscribe(
            data => {
                // refresh the list
                this.getAllProducts();
                alert('Product Added Successfully!');
                this.addSuccess = true;
                this.displayAddDialog = false;//Hide add dialog after save

                this.product = new Product();
                return true;
            },
            error => {
                console.error("Error saving Product!");
                this.addSuccess = false;
                alert(error);
            }
        );
    }
    addProductDialog() {
        this.displayAddDialog = true;
    }
}
