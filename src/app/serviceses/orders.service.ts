import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { OrderModel } from '../models/orders.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private firestore: AngularFirestore) { }

  create(order: OrderModel) {

    return this.firestore.collection('orders').add({ ...order })
  }
  getUserOrders(userId: string) {

    return this.firestore.collection('orders', ref => ref.where('userId', '==', userId)).snapshotChanges();
  }
  getAdminOrders() {
    return this.firestore.collection('orders').snapshotChanges();
  }
  getById(id: string) {

    return this.firestore.doc('orders/' + id).valueChanges();
  }

}
