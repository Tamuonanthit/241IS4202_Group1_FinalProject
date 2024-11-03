import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  position: string = 'after:right-0';

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onLogin() {
    console.log(this.loginForm.value);
    this.authService
      .login(this.loginForm.value.username!, this.loginForm.value.password!)
      .subscribe(
        (res) => {
          var d = JSON.parse(res);
          localStorage.setItem('authorization', d.access_token);
          this.router.navigateByUrl('/customers');
        },
        (error) => {
          alert('Đăng nhập thất bại');
          this.router.navigateByUrl('/login');
        }
      );
  }
}
