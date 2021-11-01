import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCrudService } from '../product-crud.service';
import { Product } from './../product.model';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  public id: any;
  public product: Product = {
    id: 0,
    name: "",
    price: 0
  };

  constructor(private router: Router, private productService: ProductCrudService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.productService.findById(this.id).subscribe((product) => {
      this.product = product;
    });

  }

  public updateProduct(): void {
    this.productService.update(this.product).subscribe(() => {
      this.productService.showMessage("Product has been updated!");
      this.router.navigate(["/products"]);
    });

  }


  public cancel(): void {
    this.router.navigate(["/products"]);
  }

}
