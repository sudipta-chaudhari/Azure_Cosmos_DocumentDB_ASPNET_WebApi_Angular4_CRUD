import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Product } from '../model/product';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class InventoryService {

    constructor(private http: Http) {}

    public getAllProducts() {
        //return this.http.get('/api/Product/GetProducts').map((res: Response) => <Product[]>res.json())
        return this.http.get('/api/Product/GetProductsAsync').map((res: Response) => <Product[]>res.json())
    }

    addProduct(product) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(product);
        //return this.http.post('/api/Product/', body, options).map((res: Response) => res.json());
        //return this.http.post('/api/Product/AddProduct', body, options).map((res: Response) => res.json());
        return this.http.post('/api/Product/CreateItemAsync', body, options).map((res: Response) => res.json());
    }

    updateProduct(product) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(product);
        //return this.http.put('/api/Product/' + product.Id, body, options).map((res: Response) => res.json());
        return this.http.post('api/Product/UpdateItemAsync/?id=' + product.id, body, options).map((res: Response) => res.json());
    }

    //deleteProduct(product) {
    //    return this.http.delete('/api/Product/' + product.Id);
    //}

    deleteProduct(id: string) {
        return this.http.get('/api/Product/DeleteItemAsync/?id=' + id);
    }
}
