import { Component, OnInit } from '@angular/core';
import { BookingListService, RoomResponse } from '../../../service/bookinglist.service'; 
import { LoginService } from '../../../service/login.service'; 
import { BookingService } from '../../../service/booking.service';
import { SelectedRoomsService } from '../../../service/selected-rooms.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookinglist',
  templateUrl: './bookinglist.component.html',
  styleUrls: ['./bookinglist.component.css'],
})
export class BookinglistComponent implements OnInit {
  
  bookingData: any;
  rooms: any[] = []; 
  selectedPriceRange: string = '';
  filteredRooms: any[] = [];
  sortOrder: string = '';
  allSelected: boolean = true;
  discountCode: string = '';
  validDiscountCodes = [
    'THAYTHANHMAIDINH',
    'THAYTHANHDEPTRAI',
    'THAYTHANH8386',
  ];
  totalPrice: number = 0;
  discount: number = 0;
  finalPrice: number = 0;
  arriveDate: Date | undefined;
  departureDate: Date | undefined;
  isModalOpen = false;
  selectedRoomImg: string | null = null;

  constructor(
    private bookingService: BookingService,
    private bookingListService: BookingListService,
    private loginService: LoginService,
    private selectedRoomsService: SelectedRoomsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.bookingData = this.bookingService.getBookingData(); 
    this.arriveDate = new Date(this.bookingData.arrivalDate);
    this.departureDate = new Date(this.bookingData.departureDate);
    this.fetchRooms();
    this.updateTotal();
  }

  goToPayment() {
    const selectedRooms = this.rooms.filter(room => room.selected);
    if (selectedRooms.length === 0) {
      alert('Vui lòng chọn phòng!'); // Alert message for no selected rooms
      return; // Exit the method if no room is selected
    }
    this.selectedRoomsService.setSelectedRooms(selectedRooms); // Set selected rooms
    // Navigate to the payment page
    this.router.navigate(['/payment']);
  }

  openModal(roomImg: string) {
    this.selectedRoomImg = roomImg;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedRoomImg = null;
  }

  
  toggleSelectAll(event: any) {
    const isSelected = event.target.checked;
    this.allSelected = isSelected;
    this.rooms.forEach((room) => {
      room.selected = isSelected;
    });
    this.updateTotal();
  }

  updateTotal() {
    const days = this.calculateDays(); // Tính số ngày
    this.totalPrice = this.rooms.reduce((sum, room) => {
      return room.selected ? sum + room.room_price * days : sum;
    }, 0);
    this.finalPrice = this.totalPrice - this.discount;
  }

  calculateDays(): number {
    if (this.arriveDate && this.departureDate) {
      const timeDiff = this.departureDate.getTime() - this.arriveDate.getTime();
      return Math.ceil(timeDiff / (1000 * 3600 * 24)); // Chuyển đổi milliseconds sang ngày
    }
    return 0;
  }

  applyDiscount() {
    if (this.validDiscountCodes.includes(this.discountCode)) {
      this.discount = 1000000; 
    } else {
      alert('Mã giảm giá không hợp lệ!');
      this.discount = 0;
    }
    this.updateTotal();
  }

  fetchRooms(): void {
    this.bookingListService.getRooms().subscribe(
      (response: RoomResponse) => {
        if (response && response.data && Array.isArray(response.data)) {
          this.rooms = response.data;
          this.filteredRooms = this.rooms;
  
          // Gọi API tìm phòng khả dụng
          const dates = {
            check_in_date: this.bookingData.arrivalDate,
            check_out_date: this.bookingData.departureDate
          };
  
          this.bookingListService.searchRoomAvailable(dates).subscribe(
            searchResponse => {
              if (searchResponse && searchResponse.available) {
                this.filteredRooms = searchResponse.data; // Cập nhật danh sách phòng
              } else {
                console.error(searchResponse.message);
                // Có thể hiển thị thông báo nếu không có phòng khả dụng
              }
            },
            error => {
              console.error('Error searching for available rooms:', error);
            }
          );
        } else {
          console.error('Expected an array but got:', response);
        }
      },
      error => {
        console.error('Error fetching rooms:', error);
        if (error.status === 401) {
          this.loginService.logout();
        }
      }
    );
  }
  

  filterRooms(): void {
    // Filtering logic remains the same
    if (!this.selectedPriceRange) {
      this.filteredRooms = this.rooms; // Reset to all rooms if no filter is selected
      return;
    }

    const [min, max] = this.selectedPriceRange.split('-').map(Number);
    this.filteredRooms = this.rooms.filter(room => {
      const price = room.room_price;
      if (max) {
        return price >= min * 1e6 && price < max * 1e6; // Assuming room prices are in VND
      } else {
        return price > 7 * 1e6; // For "7+" range
      }
    });

    this.sortRooms(); // Re-sort after filtering
  }

  sortRooms(): void {
    if (this.sortOrder === 'asc') {
      this.filteredRooms.sort((a, b) => a.room_price - b.room_price);
    } else if (this.sortOrder === 'desc') {
      this.filteredRooms.sort((a, b) => b.room_price - a.room_price);
    }
  }
}
