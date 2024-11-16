//import { Customer } from '../../../module/customer';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SignupService } from '../../../service/signup.service';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { signup } from '../../../interface/signup';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  errMessage = '';

  constructor(private signupService: SignupService) {}

  ngOnInit() {}

  signupForm = new FormGroup({
    fullname: new FormControl('', Validators.required),
    username: new FormControl(
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]+$/) // Không có khoảng trắng, không có dấu
      ]
    ),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_~])[a-zA-Z0-9!@#$%^&*?_~]+$'
      ),
    ]),
  });

  onSignup() {
    this.signupService.signup(this.signupForm.value).subscribe({
      next: (data) => {
        this.signupForm.value, this.navigateToLogin();
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
  }

  navigateToLogin() {
    // Chuyển người dùng về trang đăng nhập
    window.location.href = '/login';
  }
}
