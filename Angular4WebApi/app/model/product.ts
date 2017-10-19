import { IProduct } from '../interface/iProduct';

export class Product implements IProduct {
    //Id: number;
    id: string;
    Name: string;
    Category: string;
    Price: number;
}