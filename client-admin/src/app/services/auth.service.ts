import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(username: string = '', password: string = '') {
    const userInfo = { username, password };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(
      'http://localhost:3000/api/auth/login',
      JSON.stringify(userInfo),
      {
        headers: headers,
        responseType: 'text',
      }
    );
  }

  logout() {
    localStorage.removeItem('authorization');
    this.router.navigateByUrl('/login');
  }

  isLogin() {
    return localStorage.getItem('authorization') ? true : false;
  }
}
