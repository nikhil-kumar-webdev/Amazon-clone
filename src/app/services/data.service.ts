import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  URL = 'https://dummyjson.com/products?limit=50';
  constructor(private http: HttpClient) {}
  getData(): Observable<any> {
    return this.http.get(this.URL);
  }


    getProductDetail(id:string): Observable<any> {
    return this.http.get(`https://dummyjson.com/products/${id}`);
  }
}
