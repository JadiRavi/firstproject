import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../serviceses/orders.service';
import { OrderModel } from '../../models/orders.model';

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  adminOrders: OrderModel[] = [];
  pageSize: number = 4;
  page: number = 1;

  constructor(private orderservice: OrdersService) { }
  ngOnInit(): void {
    this.loadData();

  }
  loadData() {
    this.orderservice.getAdminOrders().subscribe(response => {
      this.adminOrders = response.map((data) => {
        return {
          id: data.payload.doc.id,
          ...data.payload.doc.data() as OrderModel
        }
      });
    })
  }

}
