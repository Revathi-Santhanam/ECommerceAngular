import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  // products: Product[] = [];
 
  // constructor(
  //   private router: Router,
  //   private productService: ProductService,
  //   private storageService: StorageService,
  //   private cartService:CartService
  // ) {
  //   this.productService.getAllProducts().subscribe({
  //     next: (data: Product[]) => {
  //       this.products = data;
  //       this.storageService.setProducts(this.products)
       
  //     },
  //     complete: () => {
  //       console.log('completed');
  //     },
  //     error: (error: Error) => {
  //       console.log('Message:', error.message);
  //       console.log('Name:', error.name);
  //     },
  //   });
  // }

 
}
