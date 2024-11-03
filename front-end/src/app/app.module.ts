import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/customer/home/home.component';
import { HeaderComponent } from './component/customer/header/header.component';
import { AccountComponent } from './component/customer/account/account.component';
import { DiningComponent } from './component/customer/dining/dining.component';
import { DiningdetailComponent } from './component/customer/diningdetail/diningdetail.component';
import { FooterComponent } from './component/customer/footer/footer.component';
import { HomepageComponent } from './component/customer/homepage/homepage.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    AccountComponent,
    DiningComponent,
    DiningdetailComponent,
    FooterComponent,
    HomepageComponent,
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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [provideHttpClient(withFetch())],
  bootstrap: [AppComponent],
})
export class AppModule {}
