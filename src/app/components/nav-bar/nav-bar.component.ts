import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../serviceses/auth.service';
import { ShoppingCartService } from '../../serviceses/shopping-cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  shoppingCartItemCount$: Observable<number>;

  constructor(private router: Router, public authService: AuthService, private shoppingCartService: ShoppingCartService) {
    this.shoppingCartItemCount$ = shoppingCartService.cartCount$;
  }


  logout() {
    localStorage.removeItem('displayName');
    localStorage.removeItem('loggedInUserId');
    localStorage.removeItem('isAdmin');
    this.shoppingCartService.clearCartItems();
    this.router.navigate(['/login']);
  }

}

