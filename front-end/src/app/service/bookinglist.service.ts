import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';



// Định nghĩa interface cho phản hồi
export interface RoomResponse {
  status: string;
  statusCode: number;
  message: string;
  data: any[]; // Có thể thay đổi kiểu của data nếu cần
}

export interface SearchRoomRequest {
  check_in_date: string;
  check_out_date: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingListService {
  private apiUrl = 'http://localhost:3000/api/get-room';
  private searchRoomUrl = 'http://localhost:3000/api/search-room'; // Địa chỉ API mới
 // Địa chỉ API mới

  constructor(private http: HttpClient) {}

  getRooms(): Observable<RoomResponse> {
    let token = null;

    // Kiểm tra xem đang ở trong trình duyệt hay không
    if (typeof window !== 'undefined' && window.localStorage) {
      token = localStorage.getItem('token'); // Lấy token từ localStorage
    }

    if (!token) {
      console.error('Token is missing. Please log in.');
      return of({ status: 'error', statusCode: 401, message: 'Unauthorized', data: [] }); // Trả về một observable với phản hồi lỗi
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Thêm token vào header
    });

    return this.http.get<RoomResponse>(this.apiUrl, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching rooms:', error);
        return of({ status: 'error', statusCode: error.status, message: error.message, data: [] }); // Trả về một observable với phản hồi lỗi
      })
    );
  }

  // Phương thức mới để tìm kiếm phòng có sẵn
  searchRoomAvailable(request: { check_in_date: string; check_out_date: string; }): Observable<any> { // Thay đổi kiểu về any
    let token = null;

    if (typeof window !== 'undefined' && window.localStorage) {
      token = localStorage.getItem('token');
    }

    if (!token) {
      console.error('Token is missing. Please log in.');
      return of({ status: 'error', statusCode: 401, message: 'Unauthorized', data: [] });
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.searchRoomUrl, request, { headers }).pipe(
      catchError(error => {
        console.error('Error searching for available rooms:', error);
        return of({ status: 'error', statusCode: error.status, message: error.message, data: [] });
      })
    );
  }
}