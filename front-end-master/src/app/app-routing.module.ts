import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './component/customer/homepage/homepage.component';
import { HomeComponent } from './component/customer/home/home.component';
import { AccountComponent } from './component/customer/account/account.component';
import { DiningComponent } from './component/customer/dining/dining.component';
import { DiningdetailComponent } from './component/customer/diningdetail/diningdetail.component';
import { LoginComponent } from './component/customer/login/login.component';
import { MeetingComponent } from './component/customer/meeting/meeting.component';
import { MycartComponent } from './component/customer/mycart/mycart.component';
import { RoomComponent } from './component/customer/room/room.component';
import { RoomdetailComponent } from './component/customer/roomdetail/roomdetail.component';
import { ServiceComponent } from './component/customer/service/service.component';
import { SignupComponent } from './component/customer/signup/signup.component';
import { PaymentComponent } from './component/customer/payment/payment.component';
import { BookingprocessComponent } from './component/customer/bookingprocess/bookingprocess.component';
import { BookinglistComponent } from './component/customer/bookinglist/bookinglist.component';
const routes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'account', component: AccountComponent },
  { path: 'account/profile', component: AccountComponent },
  { path: 'account/wishlist', component: AccountComponent },
  { path: 'account/editprofile', component: AccountComponent },
  { path: '', component: HomeComponent },
  { path: 'dining', component: DiningComponent },
  { path: 'dining/:id', component: DiningdetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'meeting', component: MeetingComponent },
  { path: 'mycart', component: MycartComponent },
  { path: 'room', component: RoomComponent },
  { path: 'room/:id', component: RoomdetailComponent },
  { path: 'service', component: ServiceComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'booking', component: BookingprocessComponent },
  { path: '', redirectTo: '/dining', pathMatch: 'full' },
  { path: '', redirectTo: '/rooms', pathMatch: 'full' },
  { path: 'bookinglist', component: BookinglistComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const RoutingComponents = [
  HomepageComponent,
  HomeComponent,
  AccountComponent,
  DiningComponent,
  DiningdetailComponent,
  LoginComponent,
  MeetingComponent,
  MycartComponent,
  RoomComponent,
  RoomdetailComponent,
  ServiceComponent,
  SignupComponent,
  PaymentComponent,
  BookingprocessComponent,
  BookinglistComponent,
];
