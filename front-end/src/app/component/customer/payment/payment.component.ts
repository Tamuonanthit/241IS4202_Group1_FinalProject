import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingService } from '../../../service/booking.service';
import { HttpClient } from '@angular/common/http';
import { UserInfoService, UserResponse } from '../../../service/userinfor.service';
import { SelectedRoomsService } from '../../../service/selected-rooms.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit, OnDestroy {
  countdown: string = '15:00'; // Giây đếm ngược
  private countdownTimer: any;
  private timeLeft: number = 900; // 15 phút = 900 giây
  //Set up for user infor
  user: any = {
    fullname: '',
    gender: '',
    dob: '',
    phone_number: '',
    email: '',
    address: ''
  };
  products: any[] = [];

  constructor(private userInfoService: UserInfoService, private bookingService: BookingService, private http: HttpClient, private selectedRoomsService: SelectedRoomsService, private router: Router) {}

  ngOnInit(): void {
    // Khởi động bộ đếm ngược khi component được khởi tạo
    this.startCountdown();
    const bookingData = this.bookingService.getBookingData();
    this.people = Number(bookingData.adults) + Number(bookingData.children) + Number(bookingData.infants);
    this.arrivalDate = bookingData.arrivalDate;
    this.departureDate = bookingData.departureDate;
    this.initializeGuests();
    this.fetchExchangeRates();
    this.fetchUserInfo();
    this.products = this.selectedRoomsService.getSelectedRooms();
    console.log('Selected Products:', this.products);
    this.updateTotal();
  }

  ngOnDestroy(): void {
    // Clear countdown timer nếu component bị hủy
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
    }
  }

  discountCode: string = '';
  validDiscountCodes = [
    'THAYTHANHMAIDINH',
    'THAYTHANHDEPTRAI',
    'THAYTHANH8386',
  ];

  // Chuyển sang giai đoạn thanh toán
  goToPayment(): void {
    if (this.validateFields()) { // Kiểm tra xem tất cả các trường đã được điền chưa
      document.getElementById('confirmStage')!.style.backgroundColor = '#D1D1D1';
      document.getElementById('paymentStage')!.style.backgroundColor = '#2E141E';
      document.getElementById('confirmInfo')!.style.display = 'none';
      document.getElementById('paymentInfo')!.style.display = 'block';
      this.startCountdown();
    }
  }
  // Quay lại giai đoạn Confirm thông tin
  goBack(): void {
    document.getElementById('confirmStage')!.style.backgroundColor = '#2E141E';
    document.getElementById('paymentStage')!.style.backgroundColor = '#D1D1D1';
    document.getElementById('confirmInfo')!.style.display = 'block';
    document.getElementById('paymentInfo')!.style.display = 'none';
    clearInterval(this.countdownTimer);
  }

  calculateDays(): number {
    if (this.arrivalDate && this.departureDate) {
      const timeDiff = new Date(this.departureDate).getTime() - new Date(this.arrivalDate).getTime();
      return Math.max(Math.ceil(timeDiff / (1000 * 3600 * 24)), 0); // Trả về 0 nếu số ngày âm
    }
    return 0;
  }
  
  // Hủy thanh toán
  cancelPayment(): void {
    const confirmCancel = confirm('Bạn có chắc chắn muốn hủy thanh toán?');
    if (confirmCancel) {
      this.goBack();
      alert('Thanh toán đã được hủy.');
    }
  }

  cancelPayment2(): void {
    const confirmCancel = confirm('Bạn có muốn đặt phòng tiếp không?');
    if (confirmCancel) {
      this.router.navigate(['/bookinglist']);
    } else {
      this.router.navigate(['/homepage']);
    }
  }

  // Hàm đếm ngược
  startCountdown(): void {
    this.countdownTimer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.countdown = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      } else {
        clearInterval(this.countdownTimer);
        alert('Vui lòng làm lại thao tác!');
        this.goBack(); // Return to confirm stage
      }
    }, 1000);
  }

  //Hàm hiện thông tin cho guest

  people: number = 0;
  arrivalDate: string = '';
  departureDate: string = '';
  guests: { id: number, name: string }[] = [];
  
  initializeGuests() {
    this.guests = Array.from({ length: this.people }, (_, index) => ({ id: index + 1, name: '' }));
  }
  
  
  //Hàm select all
  toggleSelectAll(event: any) {
    const isSelected = event.target.checked;
    this.allSelected = isSelected;
    this.products.forEach((product) => {
      product.selected = isSelected;
    });
    this.updateTotal();
  }

  allSelected: boolean = true;

  updateTotal() {
    const days = this.calculateDays();
    this.totalPrice = this.products.reduce((sum, product) => {
      if (product.selected) {
        return sum + (product.room_price * days); // Tính tổng giá phòng
      }
      return sum;
    }, 0);
  
    this.finalPrice = this.totalPrice - this.discount; // Cập nhật finalPrice
    this.totalPrice *= this.currencyRates[this.selectedCurrency]; // Chuyển đổi theo tỷ giá
    this.finalPrice *= this.currencyRates[this.selectedCurrency]; // Chuyển đổi theo tỷ giá
  
    console.log('Total Price:', this.totalPrice);
    console.log('Discount:', this.discount);
    console.log('Final Price:', this.finalPrice);
  }
  
  
  validateFields(): boolean {
    const requiredFields = ['fullname', 'gender', 'dob', 'phone_number', 'email'];
    for (const field of requiredFields) {
      if (!this.user[field]) {
        alert(`Vui lòng điền đầy đủ thông tin`);
        return false; // Trả về false nếu có trường nào trống
      }
    }
    return true; // Trả về true nếu tất cả các trường đã được điền
  }
  
  

  
  //Hàm hiện thông tin user
  fetchUserInfo(): void {
    this.userInfoService.getUserInfo().subscribe(
      (response: UserResponse) => {
        if (response && response.status === 'success' && response.data) {
          this.user = {
            fullname: response.data.fullname,
            gender: response.data.gender,
            dob: response.data.dob,
            phone_number: response.data.phone_number,
            email: response.data.email,
            address: '' // Keep this empty as per your requirement
          };
        } else {
          console.error('Error fetching user info:', response.message);
        }
      },
      error => {
        console.error('Error fetching user info:', error);
      }
    );
  }

  validateField(fieldName: string) {
    if (!this.user[fieldName]) {
      alert(`Vui lòng điền ${fieldName.replace('_', ' ')}!`);
      // Optionally, set focus back to the empty field
    }
  }

  //Đặt mã giảm

  applyDiscount() {
    if (this.validDiscountCodes.includes(this.discountCode)) {
      this.discount = 1000000; // Mặc định giảm giá là 300.000đ nếu mã hợp lệ
    } else {
      alert('Mã giảm giá không hợp lệ!');
      this.discount = 0;
    }
    this.updateTotal();
  }
  selectedCurrency: string = 'VND';
  totalPrice: number = 0;
  discount: number = 0;
  finalPrice: number = 0;

  //Hàm đổi giá tiền
  fetchExchangeRates() {
    this.http.get<any>('https://v6.exchangerate-api.com/v6/f2592951bd0fb94295aa8577/latest/USD')
      .subscribe(data => {
        const rates = data.conversion_rates;
        this.currencyRates['USD'] = 1 / rates['VND']; // Tỷ giá USD = 1/VND
        this.currencyRates['EUR'] = rates.EUR / rates['VND']; // Tỷ giá EUR
        this.currencyRates['KWD'] = rates.KWD / rates['VND']; // Tỷ giá KWD
        this.currencyRates['AUD'] = rates.AUD / rates['VND']; // Tỷ giá AUD
        this.updatePrices(); // Cập nhật giá sau khi nhận tỷ giá
      });
  }

  currencyRates: { [key: string]: number } = {
    'VND': 1, // Giá trị mặc định
    'USD': 0, // Tỷ giá tạm thời, sẽ được cập nhật từ API
    'EUR': 0, // Tương tự
    'KWD': 0,
    'AUD': 0,
  };

  updatePrices() {
    this.updateTotal();
  }

  // Hàm xóa sản phẩm
  removeProduct(index: number) {
    this.products.splice(index, 1);
    this.updateTotal();
  }

  deleteSelectedProducts() {
    this.products = this.products.filter(product => !product.selected);
    this.updateTotal();
  }

  // Hàm thêm phòng khác
  addMore() {
    // Bạn có thể thêm mã logic ở đây để thêm sản phẩm mới vào giỏ hàng
    alert('Thêm phòng khác');
  }
}
