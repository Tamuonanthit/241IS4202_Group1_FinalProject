import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountInfoService {
  private selectedTabSource = new BehaviorSubject<string>('profile');
  selectedTab$ = this.selectedTabSource.asObservable();

  setSelectedTab(tab: string) {
    this.selectedTabSource.next(tab);
  }

  getAccountInfo(){
    return {
        'name': localStorage.getItem('name'),
          'gender': localStorage.getItem('gender'),
         'dob': localStorage.getItem('dob' ),
          'phone':localStorage.getItem('phone'),
          'email':localStorage.getItem('email'),
    }
  }
}
