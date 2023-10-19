import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://fakestoreapi.com/products');
  }

  // getCachedProducts(): Product[] {
  //   this.getAllProducts().subscribe({
  //     next: (products: Product[]) => {
  //       this.storageService.saveProducts(products);
  //     },
  //     complete: () => {},
  //     error: (_error: Error) => {
  //       this.storageService.saveProducts([]);
  //     },
  //   });
  //   return this.storageService.getCachedProducts();
  // }
  saveProductsCache(products:Product[]){
    this.storageService.setProducts(products);
  }
  getLocalProducts():Product[]{
    return this.storageService.getCachedProducts();
  }
}
