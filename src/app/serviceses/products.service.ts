import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ProductModel } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {

  constructor(private fireStore: AngularFirestore) { }

  create(products: ProductModel) {
    return this.fireStore.collection('products').add({ ...products });
  }
  read(searchTerm: string, category: string = '') {
    if (searchTerm && category)
      return this.fireStore.collection('products', ref => ref.where('category', '==', category).orderBy('title').startAt(searchTerm).endAt(`${searchTerm}\uf8ff`)).snapshotChanges();

    else if (category)
      return this.fireStore.collection('products', ref => ref.where('category', '==', category)).snapshotChanges();
    else if (searchTerm)
      return this.fireStore.collection('products', ref => ref.orderBy('title').startAt(searchTerm).endAt(`${searchTerm}\uf8ff`)).snapshotChanges();
    else
      return this.fireStore.collection('products').snapshotChanges();
  }

  update(id: string, products: ProductModel) {
    return this.fireStore.doc('products/' + id).update({ ...products })
  }
  delete(id: string) {
    return this.fireStore.doc('products/' + id).delete();
  }
  getById(id: string) {
    return this.fireStore.doc<ProductModel>('products/' + id).valueChanges();
  }

}
