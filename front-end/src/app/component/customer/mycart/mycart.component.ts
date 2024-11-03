import { Component } from '@angular/core';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css'],
})
export class MycartComponent {
  // Danh sách sản phẩm
  products = [
    {
      name: 'Sản phẩm 1',
      price: 500000,
      quantity: 1,
      selected: true,
      image: 'product1.jpg',
    },
    {
      name: 'Sản phẩm 2',
      price: 300000,
      quantity: 1,
      selected: true,
      image: 'product2.jpg',
    },
    {
      name: 'Sản phẩm 3',
      price: 450000,
      quantity: 1,
      selected: true,
      image: 'product3.jpg',
    },
  ];

  // Tổng cộng
  totalPrice: number = 0;
  discount: number = 0;
  finalPrice: number = 0;

  // Mã giảm giá
  discountCode: string = '';
  validDiscountCodes = [
    'FB88',
    'TRINHTRANPHUONGTUAN',
    'SONGGIO',
    'JACKMAIDINH',
    'BACPHAN',
  ];

  // Biến lưu trạng thái của checkbox "Chọn tất cả"
  allSelected: boolean = true;

  constructor() {
    this.updateTotal(); // Cập nhật tổng cộng khi khởi tạo
  }

  // Hàm tính tổng cộng
  updateTotal() {
    this.totalPrice = this.products.reduce((sum, product) => {
      return product.selected ? sum + product.price * product.quantity : sum;
    }, 0);
    this.finalPrice = this.totalPrice - this.discount;
  }

  // Hàm chọn tất cả sản phẩm
  toggleSelectAll(event: any) {
    const isSelected = event.target.checked;
    this.allSelected = isSelected;
    this.products.forEach((product) => {
      product.selected = isSelected;
    });
    this.updateTotal();
  }

  // Hàm áp dụng mã giảm giá
  applyDiscount() {
    if (this.validDiscountCodes.includes(this.discountCode)) {
      this.discount = 300000; // Mặc định giảm giá là 300.000đ nếu mã hợp lệ
    } else {
      alert('Mã giảm giá không hợp lệ!');
      this.discount = 0;
    }
    this.updateTotal();
  }

  // Hàm xóa sản phẩm
  removeProduct(index: number) {
    this.products.splice(index, 1);
    this.updateTotal();
  }

  // Hàm thêm phòng khác
  addMore() {
    // Bạn có thể thêm mã logic ở đây để thêm sản phẩm mới vào giỏ hàng
    alert('Thêm phòng khác');
  }

  // Hàm xử lý đặt phòng
  checkout() {
    alert('Đặt phòng thành công');
  }
}
