import { Component, OnInit } from '@angular/core';
import { OrderModel } from '../../models/orders.model';
import { OrdersService } from '../../serviceses/orders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {




  orderDetails = new OrderModel();
  constructor(private Orderservice: OrdersService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')!;
    this.Orderservice.getById(id).subscribe(order => {
      this.orderDetails = order as OrderModel;
      console.log(order)
    });
  }
  redirectToOrdersPage() {
    let viewFrom = this.route.snapshot.queryParamMap.get('viewFrom');
    if (viewFrom === 'admin') {
      this.router.navigate(['admin/admin-orders'])
    }
    else {
      this.router.navigate(['/my-orders']);
    }
  }

}
