import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DininglistService {
  private apiUrl = 'http://localhost:3000/api/get-res';
  constructor() { }
}
