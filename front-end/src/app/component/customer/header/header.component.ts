import { Component } from '@angular/core';
import { LoginService } from '../../../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private loginService: LoginService, private router: Router) {}
  isLogin(): boolean {
    return this.loginService.isLoggedIn();
  }
  onLogout() {
    this.router.navigateByUrl('/login');
    this.loginService.logout();
  }
}
