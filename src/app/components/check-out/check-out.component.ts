import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderModel } from 'src/app/models/orders.model';
import { ShippingModel } from 'src/app/models/shippin.model';
import { ShoppingCartItem } from 'src/app/models/shoppingCart.model';
import { OrdersService } from 'src/app/serviceses/orders.service';
import { ShoppingCartService } from 'src/app/serviceses/shopping-cart.service';


@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  constructor(private toastr: ToastrService, private router: Router, private shoppingCartService: ShoppingCartService, private orderservice: OrdersService) { }

  checkoutform = new FormGroup({
    title: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
    imageUrl: new FormControl(null, Validators.required),
    Category: new FormControl(null, Validators.required)

  })
  cartItems: ShoppingCartItem[] = [];
  shiping = new ShippingModel();

  ngOnInit(): void {
    this.cartItems = this.shoppingCartService.CartItems;
  }
  get totalPrice() {

    return this.shoppingCartService.CartItemsTotal;
  }
  get totalItems() {
    return this.shoppingCartService.CartItemsCount;
  }

  placeOrder() {
    let order = new OrderModel();

    order.datePlaced = new Date().getTime();
    order.amount = this.shoppingCartService.CartItemsTotal;
    order.userId = localStorage.getItem('loggedInUserId')!;
    order.items = this.cartItems;
    order.shippingDetails = {
      name: this.shiping.name,
      addressLine1: this.shiping.addressLine1,
      addressLine2: this.shiping.addressLine2,
      city: this.shiping.city,
    };
    this.orderservice.create(order).then((response: any) => {
      this.shoppingCartService.clearCartItems()
      this.toastr.success('Order placed successfully...!');
      this.router.navigate(['/order-successes'])
    })
      .catch((error: any) => {
        this.toastr.error('Un-handled exception occured...!');
      });
  }

}


