import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor() {}

  isLoggedIn(): boolean {
    // Kiểm tra xem đang ở trong trình duyệt hay không
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('token') !== null;
    }
    return false;
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token');
      localStorage.removeItem('user_info');
      localStorage.removeItem('expires_at');
    }
  }
}
