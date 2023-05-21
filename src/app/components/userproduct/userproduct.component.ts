import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../models/product.model';
import { ProductsService } from '../../serviceses/products.service';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../serviceses/category.service';
import { CategoryModel } from '../../models/category.model';
import { ShoppingCartItem } from '../../models/shoppingCart.model';
import { ShoppingCartService } from '../../serviceses/shopping-cart.service';

@Component({
  selector: 'userproduct',
  templateUrl: './userproduct.component.html',
  styleUrls: ['./userproduct.component.css']
})
export class UserproductComponent implements OnInit {

  constructor(private productService: ProductsService, private toasterService: ToastrService, private catagoryService: CategoryService, private shoppingCartSercice: ShoppingCartService) { }

  userproducts: ProductModel[] = [];
  ueserProduct = new ProductModel();
  categories: CategoryModel[] = [];
  page: number = 1;
  pageSize: number = 4;
  searchTerm: string;
  selectCategoris: string = ''


  ngOnInit(): void {
    this.loadProducts();
    this.loadCatagories();
  }
  loadProducts() {
    this.productService.read(this.searchTerm, this.selectCategoris)
      .subscribe(response => {
        this.userproducts = response.map((data) => {
          return {
            id: data.payload.doc.id,
            ...data.payload.doc.data() as ProductModel
          }

        });
        console.log(this.userproducts)
      })

  }
  loadCatagories() {
    this.catagoryService.read().subscribe(response => {
      this.categories = response.map((data) => {
        return {
          id: data.payload.doc.id,
          ...data.payload.doc.data() as CategoryModel

        }
      })
    })
  }
  changeCategory($event: any) {
    if ($event.target.selectedIndex > 0)
      this.selectCategoris = this.categories[$event.target.selectedIndex - 1].id!;
    else
      this.selectCategoris = '';
    this.loadProducts();
  }

  addToCart(_product: ProductModel) {
    let _cartItem = _product as ShoppingCartItem;
    _cartItem.quantity = 1;
    _cartItem.totalPrice = _cartItem.quantity * _cartItem.price;
    this.shoppingCartSercice.addItemToCart(_cartItem)
  }
  removeItemFromtCart(_product: ProductModel) {
    let _cartItem = _product as ShoppingCartItem;
    _cartItem.quantity = -1;
    this.shoppingCartSercice.removeItemFromCart(_cartItem);

  }
  getQuntity(_product: ProductModel) {
    let _itemQty: number = 0;
    this.shoppingCartSercice.CartItems.filter(item => item.id === _product.id).forEach(item => { _itemQty += item.quantity })
    return _itemQty
  }
}


