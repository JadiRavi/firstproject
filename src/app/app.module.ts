import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ProductsComponent } from './components/products/products.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { CategoryComponent } from './components/category/category.component';
import { environment } from 'src/environments/environment.development';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './serviceses/auth.service'
import { CategoryService } from './serviceses/category.service';
import { ProductsService } from './serviceses/products.service';
import { UserproductComponent } from './components/userproduct/userproduct.component';
import { ShoppinCartComponent } from './components/shoppin-cart/shoppin-cart.component';
import { ShoppingCartService } from './serviceses/shopping-cart.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderSuccessComponent } from './components/order-success/order-success.component';

import { OrderDetailsComponent } from './components/order-details/order-details.component';

import { OrdersService } from './serviceses/orders.service';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminGuard } from './components/authguard/admingurd';
import { AuthGuard } from './components/authguard/authgurd';
import { UnAuthorisedComponent } from './components/un-authorised/un-authorised.component';

const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'admin/categories', component: CategoryComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'nav-bar', component: NavBarComponent },
  { path: 'admin/products', component: ProductsComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'userproduct', component: UserproductComponent, canActivate: [AuthGuard] },
  { path: 'shoppin-cart', component: ShoppinCartComponent, canActivate: [AuthGuard] },
  { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
  { path: 'order-successes', component: OrderSuccessComponent, canActivate: [AuthGuard] },
  { path: 'admin/admin-orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
  { path: 'order-details/:id', component: OrderDetailsComponent, canActivate: [AuthGuard] },
  { path: 'un-authorised', component: UnAuthorisedComponent },



]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    ProductsComponent,
    RegistrationComponent,
    CategoryComponent,
    UserproductComponent,
    ShoppinCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    AdminOrdersComponent,
    OrderDetailsComponent,
    MyOrdersComponent,
    UnAuthorisedComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right' }),
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forRoot(routes),
  ],
  providers: [AuthService, CategoryService, ProductsService, ShoppingCartService, OrdersService, AdminGuard, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
