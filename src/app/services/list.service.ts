import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  URL = 'https://dummyjson.com/products?limit=4';
  constructor(private http: HttpClient) {}
  getData(): Observable<any> {
    return this.http.get(this.URL);
  }
}
