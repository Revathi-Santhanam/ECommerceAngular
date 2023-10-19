import { Component } from '@angular/core';
import { Cart } from 'src/app/model/cart';
import { Product } from 'src/app/model/product';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  orderProducts: Product[] = [];
  orders: Cart[] = [];
  constructor(
    private cartService: CartService,
    private storage: StorageService,
    private authService: AuthService,
  ) {
   this.orders= this.storage.getOrders();
   console.log(this.orders);
   
   for(let o of this.orders){
    let loggedInUser: User = this.authService.getLoggedInUser();
    if(o.user.id===loggedInUser.id){
      this.orderProducts=o.cart
    }
   }
    
    // this.cartProducts = this.storageService.getCartProducts()
  }

}
