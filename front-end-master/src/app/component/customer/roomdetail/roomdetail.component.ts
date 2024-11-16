import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-roomdetail',
  templateUrl: './roomdetail.component.html',
  styleUrls: ['./roomdetail.component.css'],
})
export class RoomdetailComponent implements OnInit {
  room: any;

  // Danh sách phòng cố định
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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get('id');
    console.log('Room ID:', roomId); // Kiểm tra ID nhận được từ URL
    this.room = this.rooms.find((r) => r.id === roomId); // Tìm phòng từ danh sách dựa trên ID
    console.log('Room details:', this.room); // Kiểm tra dữ liệu phòng được tìm thấy
  }
}
