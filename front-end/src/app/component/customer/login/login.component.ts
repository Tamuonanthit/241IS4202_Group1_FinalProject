import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import moment from 'moment';
import { error } from 'console';
import { LoginService } from '../../../service/login.service';

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
          const d= JSON.parse(res)
          console.log(d)
          const expiresAt = moment().add(d.expiresIn, 'second');
          localStorage.setItem('token', d.access_token);
          localStorage.setItem('name', d.result.data.fullname)
          localStorage.setItem('gender', d.result.data.gender)
          localStorage.setItem('dob', d.result.data.dob)
          localStorage.setItem('phone', d.result.data.phone_number)
          localStorage.setItem('email', d.result.data.email)
          localStorage.setItem(
            'expires_at',
            JSON.stringify(expiresAt.valueOf())
          );
          this.router.navigateByUrl('/');
        },
        (error) => {
          console.log('Đã xảy ra lỗi', error);
          this.router.navigateByUrl('/login');
        }
      );
  }
}
