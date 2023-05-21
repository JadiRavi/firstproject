import { Component, OnInit } from '@angular/core';
import { CategoryModel } from '../../models/category.model';
import { CategoryService } from '../../serviceses/category.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  modelHeader: string = '';
  categoryes: CategoryModel[] = [];
  category = new CategoryModel();

  constructor(private categoryService: CategoryService, private toastr: ToastrService, private router: Router) { }
  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    console.log(this.categoryes)
    this.categoryService.read()
      .subscribe(response => {
        this.categoryes = response.map((data) => {
          return {
            id: data.payload.doc.id,
            ...data.payload.doc.data() as CategoryModel
          }
        });
      })

  }
  addCategory() {
    this.modelHeader = 'Add categoryes'
    this.category = new CategoryModel();

  }
  editeCategory(_category: CategoryModel) {
    this.modelHeader = 'Edite Category';
    this.category = _category;
  }
  deleteCategory(id: any) {
    this.categoryService.delete(id).then((response) => {
      return {

      }
    })
  }
  saveCategory() {
    if (this.category.id) {
      this.categoryService.update(this.category.id, this.category).then((response) => {
        this.toastr.success('category successfully....!');


      })
        .catch((error: any) => {
          this.toastr.error('un-handeles exception occured...!');
        })
    }
    else {
      this.categoryService.create(this.category).then((response) => {
        this.toastr.success('Category add successfully....!');
      })
        .catch((error: any) => {
          this.toastr.error('un-handeles exception occured...!')

        });
    }
  }
}