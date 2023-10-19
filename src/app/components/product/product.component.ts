import { Component } from '@angular/core';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  products: Product[] = [];
  pageSize: number = 1;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data: Product[]) => {
        this.productService.saveProductsCache(data);
        this.products = data;
      },
      complete: () => {},
      error: (error: Error) => {},
    });
  }
  addToCart(id: number) {
    this.cartService.addToCart(id);
  }
}
