import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../serviceses/products.service';
import { ToastrService } from 'ngx-toastr';
import { ProductModel } from '../../models/product.model';
import { CategoryModel } from '../../models/category.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../../serviceses/category.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private productService: ProductsService, private toaster: ToastrService, private router: Router, private categoryService: CategoryService) { }
  currunPage: number = 1;

  productform = new FormGroup({
    title: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
    imageUrl: new FormControl(null, Validators.required),
    category: new FormControl(null, Validators.required)

  })

  modeleHeader: string = '';
  products: ProductModel[] = [];
  categories: CategoryModel[] = [];
  product = new ProductModel();
  page: number = 1;
  pageSize: number = 4;
  searchTerm: string;
  selectCategry: string;
  showLoader: boolean = false;

  addProduct() {
    this.modeleHeader = 'Add product';
    this.product = new ProductModel();
  }
  editeProduct(_product: ProductModel) {
    this.modeleHeader = 'Edite product';
    this.product = _product;
  }
  deleteProduct(id: any) {
    this.productService.delete(id).then((response) => {
      this.toaster.success('delete success fully.....!');
    })
      .catch((error: Response) => {
        this.toaster.error('un-handeles exception occured...!')
      });
  }
  saveProduct() {
    if (this.product.id) {
      this.productService.update(this.product.id, this.product).then((response) => {
        this.toaster.success('update successfully....!');

        this.router.navigate(['/category'])
      })
        .catch((error: any) => {
          this.toaster.error('un-handeles exception occured...!');
        })
    }
    else {
      this.productService.create(this.product).then((response) => {
        this.toaster.success('product add successfully....!');
      })
        .catch((error: any) => {
          this.toaster.error('un-handeles exception occured...!')

        });
    }
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategory()
  }

  loadProducts() {
    this.showLoader = true;
    this.productService.read(this.searchTerm).subscribe(response => {
      this.products = response.map((data) => {
        return {
          id: data.payload.doc.id,
          ...data.payload.doc.data() as ProductModel
        }
      });
      this.showLoader = false;
    })

  }
  loadCategory() {
    this.categoryService.read().subscribe(response => {
      this.categories = response.map((data) => {
        return {
          id: data.payload.doc.id,
          ...data.payload.doc.data() as CategoryModel
        }
      })
    })
  }
  filterData() {
    this.loadProducts();
  }
}



