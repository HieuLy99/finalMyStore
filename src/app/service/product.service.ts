import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Product } from '../model/product';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  mockData = 'http://localhost:4200/assets/data.json';
  storage = window.localStorage;

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error, operation);
      return of(result as T);
    };
  }
  constructor(private http: HttpClient) { }

  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.mockData);
  }
  addProduct(product: Product[]): void {
    this.storage.setItem('products', JSON.stringify(product));
  }

  getProductByID(id: number): Observable<Product> {
    const url = `${this.mockData}/${id}`;
    return this.http
      .get<Product>(url)
      .pipe(catchError(this.handleError<Product>(`getProduct id=${id}`)));
  }
}
