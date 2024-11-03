import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Define the UserResponse interface
export interface UserResponse {
  status: string;
  message: string;
  data: {
    id: string;
    username: string;
    fullname: string;
    email: string;
    phone_number: string;
    avatar: string;
    status: string;
    gender: string;
    dob: string;
    address: string;
    verified: boolean;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
  } | null; // Allow data to be null
}

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private apiUrl = 'http://localhost:3000/api/get-user';

  constructor(private http: HttpClient) {}

  getUserInfo(): Observable<UserResponse> {
    let token = null;

    // Check if we're in a browser environment
    if (typeof window !== 'undefined' && window.localStorage) {
      token = localStorage.getItem('token'); // Get token from localStorage
    }

    if (!token) {
      console.error('Token is missing. Please log in.');
      return of({
        status: 'error',
        message: 'Unauthorized',
        data: null // Return null for data if token is missing
      });
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<UserResponse>(this.apiUrl, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching user info:', error);
        return of({
          status: 'error',
          message: error.message,
          data: null // Return null for data in case of error
        });
      })
    );
  }
}
