import { ShippingModel } from "./shippin.model";
import { ShoppingCartItem } from "./shoppingCart.model";

export class OrderModel {
    id?: string;
    userId: string;
    datePlaced: number;
    amount: number;
    shippingDetails: ShippingModel = new ShippingModel();
    items: ShoppingCartItem[] = [];

}