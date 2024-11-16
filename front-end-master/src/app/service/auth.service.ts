import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}
  login(username: string = '', password: string = ''):Observable<any> {
    const userInfo = { username, password };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post('/api/auth/login', JSON.stringify(userInfo), {
      headers: headers,
      responseType: 'text',
    });
  }
  logOut() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('loginName');
    localStorage.removeItem('name')
    localStorage.removeItem('dob')
    localStorage.removeItem('gender')
    localStorage.removeItem('phone')
    localStorage.removeItem('email')
  }
}
