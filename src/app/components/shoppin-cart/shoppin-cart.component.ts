import { Component, OnInit } from '@angular/core';
import { ShoppingCartItem } from '../../models/shoppingCart.model';
import { ShoppingCartService } from '../../serviceses/shopping-cart.service';
import { Router } from '@angular/router';
import { ProductModel } from '../../models/product.model';
import { retry } from 'rxjs';

@Component({
  selector: 'shoppin-cart',
  templateUrl: './shoppin-cart.component.html',
  styleUrls: ['./shoppin-cart.component.css']
})
export class ShoppinCartComponent implements OnInit {

  cartItems: ShoppingCartItem[] = [];
  constructor(private _cartService: ShoppingCartService, private router: Router) { }


  ngOnInit() {
    this.cartItems = this._cartService.CartItems;
  }
  clearCart() {
    this._cartService.clearCartItems();
    this.cartItems = this._cartService.CartItems;

  }
  checkOut() {
    this.router.navigate(['/check-out'])
  }
  addToCart(_cartItem: ShoppingCartItem) {
    this._cartService.addItemToCart(_cartItem);
    this.cartItems = this._cartService.CartItems;

  }
  removeFromCart(_cartItem: ShoppingCartItem) {
    this._cartService.removeItemFromCart(_cartItem);
    this.cartItems = this._cartService.CartItems;
  }
  getQuantity(_product: ProductModel) {
    let _itemQty: number = 0;
    this._cartService.CartItems.filter(item => item.id === _product.id).forEach(item => { _itemQty += item.quantity })
    return _itemQty
  }
  get totalPrice() {
    return this._cartService.CartItemsTotal;
  }
  get totalItemsCount() {
    return this._cartService.CartItemsCount;
  }

}
