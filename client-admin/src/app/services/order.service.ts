import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/api/'; //

  constructor(private http: HttpClient) {}

  getOrders(): Observable<any> {
    const token = 'Bearer ' + localStorage.getItem('authorization');
    console.log(token);
    const headers = {
      Authorization: token,
      'Content-Type': 'application/json',
    };
    return this.http.get<any>(`${this.apiUrl}/admingetbooking`, { headers });
  }
}
