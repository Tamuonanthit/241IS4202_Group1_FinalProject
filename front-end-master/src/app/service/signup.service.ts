import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { signup } from '../interface/signup';
//import { Customer } from '../module/customer';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(private _http: HttpClient) {}

  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }

  signup(data: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json;charset=utf-8'
    );
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };
    return this._http
      .post<any>('api/auth/register', JSON.stringify(data), requestOptions)
      .pipe(
        map((res) => JSON.parse(res) as Array<signup>),
        retry(3),
        catchError(this.handleError)
      );
  }
}
