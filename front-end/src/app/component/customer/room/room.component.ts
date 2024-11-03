import { Component, ViewChild, ElementRef } from '@angular/core';
import { BookingService } from '../../../service/booking.service';
import { BookingListService, RoomResponse } from '../../../service/bookinglist.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
//Data về room category
export class RoomComponent {
  rooms = [
    {
      id: 'Deluxe',
      name: 'Phòng Deluxe',
      image: 'assets/image/deluxe.jpg',
      size: '5 phòng, 37m²',
      bed: '01 giường lớn hoặc 02 giường đơn',
      balcony: 'Hướng thị trấn',
    },
    {
      id: 'Premier',
      name: 'Phòng Premier',
      image: 'assets/image/premier.jpg',
      size: '5 phòng, 37m²',
      bed: '01 giường lớn hoặc 02 giường đơn',
      balcony: 'Ban công riêng cho tất cả các phòng từ tầng 6 đến tầng 9',
    },
    {
      id: 'Executive',
      name: 'Phòng Executive',
      image: 'assets/image/executive.jpg',
      size: '5 phòng, 37m²',
      bed: '01 giường lớn hoặc 02 giường đơn',
      balcony: 'Ban công riêng cho tất cả các phòng từ tầng 6 đến tầng 9',
    },
    {
      id: 'Family',
      name: 'Phòng Gia Đình',
      image: 'assets/image/family.jpg',
      size: '5 phòng, 60m²',
      bed: '01 giường lớn và 01 giường tầng',
      balcony: 'Ban công riêng cho tất cả các phòng từ tầng 6 đến tầng 9',
    },
    {
      id: 'DeluxeSuite',
      name: 'Phòng Deluxe Suite',
      image: 'assets/image/deluxesuite.jpg',
      size: '5 phòng, 65m²',
      bed: '01 giường Super king',
      balcony: 'Ban công riêng cho tất cả các phòng từ tầng 6 đến tầng 9',
    },
    {
      id: 'PremierSuite',
      name: 'Phòng Premier Suite',
      image: 'assets/image/premiersuite.jpg',
      size: '5 phòng, 78m²',
      bed: '01 giường Super king',
      balcony: 'Ban công riêng',
    },
    {
      id: 'ExecutiveSuite',
      name: 'Phòng Executive Suite',
      image: 'assets/image/executivesuite.jpg',
      size: '5 phòng, 109m²',
      bed: '01 giường Super king',
      balcony: 'Ban công riêng',
    },
    {
      id: 'AmourSuite',
      name: 'Phòng Amour Suite',
      image: 'assets/image/amour-suite.jpg',
      size: '5 phòng, 105m²',
      bed: '01 phòng ngủ: 1 lớn hoặc 2 giường đơn',
      balcony: 'Ban công riêng',
    },
  ];

  //Set up cho thanh booking
  arrivalDate: string = '';
  departureDate: string = '';
  adults: number = 1;
  children: number = 0;
  infants: number = 0;

  //Lấy thanh booking
  @ViewChild('bookingSection') bookingSection!: ElementRef;

  constructor(private bookingService: BookingService, private router: Router, private bookinglistservice: BookingListService) {}

  bookRoom(room: any) {
    // Cuộn đến thanh đặt phòng
    this.bookingSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  onBookingSubmit(event: Event) {
    event.preventDefault();
    
    // Kiểm tra các trường thông tin
    if (!this.arrivalDate || !this.departureDate || !this.adults) {
      alert('Vui lòng điền hết thông tin.');
      return; // Dừng lại nếu không đủ thông tin
    }

    const today = new Date();
    const selectedArrivalDate = new Date(this.arrivalDate);
    const selectedDepartureDate = new Date(this.departureDate);

    console.log('today:', today);

    // Check if the selected arrival date is in the past
    if (selectedArrivalDate < today) {
      alert('Lựa chọn ngày không phù hợp. Vui lòng chọn lại!');
      return;
    }

    // Check if the arrival date is after the departure date
    if (selectedArrivalDate >= selectedDepartureDate) {
      alert('Lựa chọn ngày không phù hợp. Vui lòng chọn lại!');
      return;
    }

    // Proceed with booking if dates are valid
    console.log('Booking successful:', {
      arrivalDate: this.arrivalDate,
      departureDate: this.departureDate,
      adults: this.adults,
      children: this.children,
      infants: this.infants,
    });
  
    const bookingData = {
      arrivalDate: this.arrivalDate,
      departureDate: this.departureDate,
      adults: this.adults,
      children: this.children,
      infants: this.infants,
    };

    this.bookingService.setBookingData(bookingData);
    this.router.navigate(['/bookinglist']);
  }
}
