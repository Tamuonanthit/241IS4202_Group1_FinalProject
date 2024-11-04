import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private apiUrl = 'http://localhost:3000/api'; // Thay bằng URL API của bạn

  constructor(private http: HttpClient) {}

  getRooms(): Observable<any> {
    const token = 'Bearer ' + localStorage.getItem('authorization');
    console.log(token);
    const headers = {
      Authorization: token,
      'Content-Type': 'application/json',
    };
    return this.http.get<any>(`${this.apiUrl}/get-room`, { headers });
  }
  addRoom(roomId: string): Observable<any> {
    const token = 'Bearer ' + localStorage.getItem('authorization');
    const url = `${this.apiUrl}/add-room/${roomId}`;
    const headers = {
      Authorization: token,
      'Content-Type': 'application/json',
    };
    return this.http.post<any>(`${this.apiUrl}/add-room`, roomId, {
      headers,
    });
  }
  deleteRoom(roomId: string): Observable<any> {
    const token = 'Bearer ' + localStorage.getItem('authorization');
    const url = `${this.apiUrl}/delete-room/${roomId}`;
    const headers = {
      Authorization: token,
      'Content-Type': 'application/json',
    };
    return this.http.delete<any>(url, { headers });
  }
}
