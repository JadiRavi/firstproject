import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { OrderModel } from '../../models/orders.model';
import { OrdersService } from '../../serviceses/orders.service';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  currunPage: number = 1;
  myOrders: OrderModel[] = [];
  itemsPerPage: number = 4;
  constructor(public orderservice: OrdersService, private router: Router) { }
  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    let userId = localStorage.getItem('loggedInUserId');


    this.orderservice.getUserOrders(userId!).subscribe(response => {

      this.myOrders = response.map((data) => {
        return {
          id: data.payload.doc.id,
          ...data.payload.doc.data() as OrderModel
        }
      });
    })
  }
}
