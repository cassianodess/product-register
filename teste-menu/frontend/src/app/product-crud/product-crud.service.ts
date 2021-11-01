import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductCrudService {

  public baseUrl = "http://localhost:3001/products"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  public showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    })
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage("Error!", true);
    return EMPTY;
  }

  public findAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map((obj) => obj), catchError((e) => this.errorHandler(e))
    );
  }

  public findById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`).pipe(
      map((obj) => obj), catchError((e) => this.errorHandler(e))
    );
  }

  public create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map((obj) => obj), catchError((e) => this.errorHandler(e))
    );
  }

  public delete(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.baseUrl}/${id}`).pipe(
      map((obj) => obj), catchError((e) => this.errorHandler(e))
    );
  }

  public update(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${product.id}`, product).pipe(
      map((obj) => obj), catchError((e) => this.errorHandler(e))
    );
  }


}
