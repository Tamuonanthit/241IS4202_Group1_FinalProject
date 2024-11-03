import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Dining } from '../interface/dining';
import { DiningDetail } from '../interface/dining-detail';

@Injectable({
  providedIn: 'root'
})
export class DiningService {
  constructor(private _http: HttpClient) {}
// get all dining
  getDinings(): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>("/api/get-res", requestOptions).pipe(
      map(res => JSON.parse(res) as Array<Dining>),
      retry(3),
      catchError(this.handleError))
  }
  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message))
  }
}