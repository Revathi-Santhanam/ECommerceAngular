import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { StorageService } from './storage.service';
import { Observable, count } from 'rxjs';
import { AuthService } from './auth.service';
import { Cart } from '../model/cart';
import { User } from '../model/user';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: Cart[] = [];

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private productService: ProductService
  ) {}

  getCount(): number {
    let loggedInUser: User = this.authService.getLoggedInUser();

    let userCart: Cart | undefined = this.cart.find(
      (c) => c.user.id === loggedInUser.id
    );
    let count: number = 0;
    if (userCart) {
      for (let product of userCart.cart) {
        if (product.count) {
          count += product.count;
        }
      }
    }
    return count;
  }

  addToCart(produtId: Number): void {
    let loggedInUser: User = this.authService.getLoggedInUser();
    let products: Product[] = this.productService.getLocalProducts();

    let product: Product | undefined = products.find((p) => p.id == produtId);
    if (product) {
      let userCart: Cart | undefined = this.cart.find(
        (u) => u.user.id === loggedInUser.id
      );
      console.log(userCart);
      if (userCart) {
        let productExist: Product | undefined = userCart.cart.find(
          (p) => p.id === produtId
        );
        if (productExist) {
          let newCart: Product[] = [];
          for (let product of userCart.cart) {
            if (product.id === produtId) {
              newCart.push({ ...product, count: product.count + 1 });
            } else {
              newCart.push(product);
            }
          }

          userCart.cart = newCart;
        } else {
          userCart?.cart.push({ ...product, count: 1 });
        }
        let updatedCart: Cart[] = this.cart.filter(
          (c) => c.user.id !== loggedInUser.id
        );
        updatedCart.push(userCart);
        this.storageService.setCart(updatedCart);
      } else {
        let newCart: Cart = {
          user: loggedInUser,
          cart: [{ ...product, count: 1 }],
          orderProducts: [],
          orders: []
        };
        this.cart.push(newCart);
        console.log(this.cart);
       
        this.storageService.setCart(this.cart);
        this.storageService.setOrders(this.cart)
       
        
      }
      
    }
    // for (let pro of this.cart) {
    //   if (pro.user.id === loggedInUser.id)
    //     this.storageService.setCartProducts(pro.cart);
    // }
    // this.storageService.setCartProducts(this.addProductsToLocal(this.cart));
  }

  // addProductsToLocal(cart: Cart[]): Product[] {
  //   let newCarts: Product[] = [];

  //   let loggedInUser: User = this.authService.getLoggedInUser();
  //   for (let pro of cart) {
  //     if (pro.user.id === loggedInUser.id) {
  //       newCarts.push(...pro.cart);
  //     }
  //   }
  //   console.log(newCarts);
  //   return newCarts;
  // }

  // addToCart(id: number): void {
  //   let products: Product[] = this.storageService.getCachedProducts();
  //   let product: Product | undefined = products.find((p) => p.id === id);
  //   console.log(id);

  //   if (product) {
  //     let cartProduct: Product | undefined = this.cart.find(
  //       (c) => c.id === product?.id
  //     );
  //     console.log(cartProduct);

  //     if (cartProduct) {
  //       let newCart: Product[] = [];
  //       for (let product of this.cart) {
  //         if (product.id === id) {
  //           newCart.push({ ...product, count: product.count + 1 });
  //         } else {
  //           newCart.push(product);
  //         }
  //       }
  //       this.cart = newCart;
  //     } else {
  //       this.cart.push({ ...product, count: 1 });
  //       console.log('else');
  //     }
  //   }
  //   console.log(this.cart);
  //   // this.storageService.saveCartProducts(this.cart);
  // }

  // delCartProduct(id: number) {
  //   this.storageService.removeProduct(id);
  //   console.log('deleted');
  // }
  // checkOut(){
  //   this.storageService.loadOrders(this.orders);
  // }
}
