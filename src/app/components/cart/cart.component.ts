import { Component, OnInit } from '@angular/core';
import { count } from 'rxjs';
import { Cart } from 'src/app/model/cart';
import { Product } from 'src/app/model/product';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartProducts: Product[] = [];
  carts: Cart[] = [];
 

  constructor(
    private cartService: CartService,
    private storageService: StorageService,
    private authService: AuthService
  ) {
    this.carts = storageService.getCart();
    console.log(this.carts);
    
    for (let c of this.carts) {
      let loggedInUser: User = this.authService.getLoggedInUser();
      if (c.user.id === loggedInUser.id) this.cartProducts = c.cart;
    }
    // this.cartProducts = this.storageService.getCartProducts()
  }
  totalPrice(price: number, count: number): number {
    let total: number = 0;

    total += price * count;

    return total;
  }
  checkOut() {
    this.storageService.removeCartProduct();
    this.carts=[]
  }
}
