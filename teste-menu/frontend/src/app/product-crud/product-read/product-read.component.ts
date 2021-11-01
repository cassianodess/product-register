import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCrudService } from './../product-crud.service';
import { Product } from './../product.model';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {

  public products: Product[] = [];
  public resp: any;
  constructor(private productService: ProductCrudService, private router: Router) { }

  ngOnInit(): void {
    this.getProducts()
  }

  public getProducts(): void {
    this.productService.findAll().subscribe(products => {
      this.products = products;
    });

  }

  public updateProduct(productId: any) {
    this.router.navigate(["products/update"], productId);
    console.log(this.router)
  }

  public deleteProduct(productId: any) {
    this.resp = confirm("Are you sure you want to delete this?");
    if (this.resp) {
      this.productService.delete(productId).subscribe(() => {
        this.productService.showMessage("Product has been deleted!");
        this.ngOnInit();
      });
    }

  }


}
