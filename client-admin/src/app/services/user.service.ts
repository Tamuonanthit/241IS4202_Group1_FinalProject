import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:3000/api';

  getUsers(): Observable<any> {
    const token = 'Bearer ' + localStorage.getItem('authorization');
    console.log(token);
    const headers = {
      Authorization: token,
      'Content-Type': 'application/json',
    };
    return this.http.get<any>(`${this.apiUrl}/all-users-list`, { headers });
  }

  deleteUser(userId: string): Observable<any> {
    const token = 'Bearer ' + localStorage.getItem('authorization');
    const url = `${this.apiUrl}/delete-user/${userId}`;
    const headers = {
      Authorization: token,
      'Content-Type': 'application/json',
    };
    return this.http.delete<any>(url, { headers });
  }

  addUser(user: any): Observable<any> {
    const token = 'Bearer ' + localStorage.getItem('authorization');
    const headers = {
      Authorization: token,
      'Content-Type': 'application/json',
    };
    return this.http.post<any>(`${this.apiUrl}/auth/register`, user, {
      headers,
    });
  }

  editUser(user: any): Observable<any> {
    const token = 'Bearer ' + localStorage.getItem('authorization');
    const url = `${this.apiUrl}/admin-update-user/${user._id}`;
    const data = {
      fullname: user.fullname,
      phone_number: user.phone_number,
      gender: user.gender,
      dob: user.dob,
      address: user.address,
    };
    console.log(data);
    const headers = {
      Authorization: token,
      'Content-Type': 'application/json',
    };
    return this.http.put<any>(url, data, { headers });

  }
}
