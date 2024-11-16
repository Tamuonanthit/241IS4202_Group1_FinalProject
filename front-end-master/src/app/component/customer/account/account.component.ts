import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountInfoService } from '../../../service/account-info.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent implements OnInit {
  selectedTab: string = '';
  data:any

  constructor(
    private accountInfoService: AccountInfoService,
    private router: Router
  ) {}

  
  ngOnInit() {
    this.accountInfoService.selectedTab$.subscribe((tab) => {
      this.selectedTab = tab;
    });

    this.data = this.accountInfoService.getAccountInfo()
    console.log(this.data)

  }

  selectTab(tab: string, event: Event) {
    this.accountInfoService.setSelectedTab(tab);

    if (tab === 'home') {
      this.router.navigate(['/homepage']);
    } else if (tab === 'other') {
      this.router.navigate(['/other']);
    }

    // Handle update event

    // Prevent the default behavior of the click event
    event.preventDefault();
  }
}
