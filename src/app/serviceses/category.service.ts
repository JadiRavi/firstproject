import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CategoryModel } from '../models/category.model';


@Injectable({ providedIn: 'root' })
export class CategoryService {

  constructor(private firestore: AngularFirestore) { }

  create(category: CategoryModel) {

    return this.firestore.collection('category').add({ ...category })
  }
  read() {
    return this.firestore.collection('category').snapshotChanges();
  }
  update(id: string, category: CategoryModel) {
    return this.firestore.doc('category/' + id).update({ ...category });
  }
  delete(id: string) {

    return this.firestore.doc('category/' + id).delete();
  }
  getById(id: string) {

    return this.firestore.doc<CategoryModel>('category/' + id).valueChanges();
  }
}
