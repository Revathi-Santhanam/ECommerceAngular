import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Product } from '../model/product';
import { JsonPipe } from '@angular/common';
import { Cart } from '../model/cart';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}
  products: Product[] = [];
  cart: Cart[] = [];
  order:Cart[]=[]

  users: User[] = [{ id: 1, email: 'revathi@gmail.com', password: 'revathii' }];
  loadUsers() {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }
  getAllUsers(): User[] {
    return JSON.parse(localStorage.getItem('users') as string);
  }

  setLoggedInUser(user: User): void {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }
  removeLoggedInUser(): void {
    localStorage.removeItem('loggedInUser');
  }

  isUserLoggedIn(): boolean {
    return localStorage.getItem('loggedInUser') !== null;
  }

  getCachedProducts(): Product[] {
    return JSON.parse(localStorage.getItem('products') as string);
  }
  getCart(): Cart[] {
    return JSON.parse(localStorage.getItem('cart') as string);
  }
  setCart(cart: Cart[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  getOrders(): Cart[] {
    return JSON.parse(localStorage.getItem('orders') as string);
  }
  setOrders(order: Cart[]) {
    localStorage.setItem('orders', JSON.stringify(order));
  }
  getLoggedInUser(): User {
    return JSON.parse(localStorage.getItem('loggedInUser') as string);
  }
  setProducts(products: Product[]) {
    localStorage.setItem('products', JSON.stringify(products));
  }
  getRandomId(): number {
    let id = Math.floor(Math.random() * 100 + 1);
    return id;
  }
  getNewUsers(user: User): User[] {
    let newUser: User = {
      id: this.getRandomId(),
      email: user.email,
      password: user.password,
    };
    this.users.push(newUser);
    console.log(this.users);

    localStorage.setItem('users', JSON.stringify(this.users));

    return this.users;
  }
 
 

  // getCartProducts(): Product[] {
  //   return JSON.parse(localStorage.getItem('cartproducts') as string);
  // }
  // setCartProducts(cart: Product[]) {
  //   localStorage.setItem('cartproducts', JSON.stringify(cart));
  // }
  // removeCartProducts():void{
  //   localStorage.removeItem('cartproducts')
  // }

  // loadOrders(orders:Product[]){
  //   localStorage.setItem("orders",JSON.stringify(orders));
  // }
  // getOrders():Product[]{
  //   return JSON.parse(localStorage.getItem("orders")as string);
  // }
  removeCartProduct(): void {
    let loggedInUser: User = this.getLoggedInUser();
    let cartProducts: Cart[] = this.getCart();
    const filterProduct = cartProducts.filter(
      (pro) => pro.user.id !== loggedInUser.id
    );
    console.log(filterProduct);

    this.setCart(filterProduct);
  }
}
