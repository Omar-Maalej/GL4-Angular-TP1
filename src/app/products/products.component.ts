import { Component } from "@angular/core";
import {
  BehaviorSubject,
  Observable,
  concatMap,
  map,
  takeWhile,
  scan,
} from "rxjs";
import { Product } from "./dto/product.dto";
import { ProductService } from "./services/product.service";
import { Settings } from "./dto/product-settings.dto";
import { ProductApiResponse } from "./dto/product-api-response.dto";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent {
  /* Todo : Faire le nécessaire pour créer le flux des produits à afficher */
  /* Tips : vous pouvez voir les différents imports non utilisés et vous en inspirer */
  products$: Observable<Product[]>;
  private loadMoreSubject = new BehaviorSubject<void>(undefined); 
  private limit = 12; 
  private skip = 0; 
  private total = 0; 
  private hasMoreProducts = true; 
  private maxSkip = 108;

  constructor(private productService: ProductService) {
    this.products$ = this.loadMoreSubject.pipe(
      takeWhile(() => this.skip <= this.maxSkip), 
      concatMap(() => this.fetchProducts()), 
      scan((acc : Product[], products) => [...acc, ...products], []), 
    );
  }

  private fetchProducts(): Observable<Product[]> {
    const settings: Settings = { limit: this.limit, skip: this.skip };
    return this.productService.getProducts(settings).pipe(
      map((response: ProductApiResponse) => {
        this.skip += this.limit; 
        this.total = response.total;
        this.hasMoreProducts = this.skip <= this.maxSkip; 
        return response.products; 
      })
    );
  }

  loadMore(): void {
    if (this.hasMoreProducts) {
      this.loadMoreSubject.next(); 
    }
  }

}
