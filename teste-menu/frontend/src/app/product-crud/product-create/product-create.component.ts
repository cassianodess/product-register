import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCrudService } from './../product-crud.service';
import { Product } from './../product.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  // @Input() public name: string = "";
  // public objs = [
  //   "Car", "Notebook", "Cellphone"
  // ]

  product: Product = {
    name: "",
    price: 0

  }

  constructor(private productService: ProductCrudService, private router: Router) { }

  ngOnInit(): void {
  }

  public createProduct(): void {
    this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage("Product created successfully!");
      this.router.navigate(["/products"]);
    })

  }

  public cancel(): void {

    this.router.navigate(["/products"])


  }



}
