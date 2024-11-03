import { Component, OnInit, ElementRef } from '@angular/core';
import { DiningService } from '../../../service/dining.service';
import { Dining } from '../../../interface/dining';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dining',
  templateUrl: './dining.component.html',
  styleUrls: ['./dining.component.css'],
})

//Data về dining category
export class DiningComponent implements OnInit {
  diningList = [
    {
      _id: 1,
      restaurant_name: 'Nhà hàng La Vie en Rose',
      restaurant_decription:
        'Lấy cảm hứng từ bản tình ca trứ danh của Pháp, La Vie en Rose là một bức tranh lãng mạng về một cuộc sống tươi đẹp tràn đầy những xúc cảm của tình yêu. Trong không gian mộng mơ của Tam Đảo, nhà hàng La Vie en Rose là một bản nhạc du dương, đưa thực khách đến với một không gian đậm chất tinh tế của nền văn hóa phương Tây qua các món Âu đặc sắc được chế biến công phu bởi những đầu bếp chuyên nghiệp.',
      restaurant_image: 'assets/image/restaurant_la_vie_en_rose.jpg',
      restaurant_detail: {
        location: 'Tầng 1',
        guest: 200,
        menu_detail: 'All-day dining: Ăn sáng buffet, Set menu, À la carte',
        hours: '7:00 - 21:00',
      },
      restaurant_menu: [
        'Royal Crab meat salad Spring vegetable with sesame cracker',
        'Sticky rice soup with abalone and green bean Vietnamese mountain ginseng',
        'Steamed garrupa (Song Fish) with ginger leaf Vietnamese fresh noodles',
        'Lobster with seafood sauce',
        'Steamed red snapper with soya sauce',
        'Grilled oyster with onion oil',
        'Stir fried mountain chicken with rock salt',
        'Grilled Aus beef in DONG leaf',
        'Stir fried vegetables with mushroom',
        'Mushroom and lotus seed congee',
        'Stir fried king crab legs in rock salt',
        'Baked lobster with cheese',
        'Stir fried king rock lobster in tamarind sauce',
        'Steamed grouper with black mushroom',
      ],
      restaurant_signature: [
        {
          images: 'uploads/restaurants/dishes1-1730016800198.jpg',
          describe:
            'Royal Crab meat salad Spring vegetable with sesame cracker ',
          _id: '671df74e1ae2a3ca3beec361',
        },
        {
          images: 'uploads/restaurants/dishes2-1730016800204.jpg',
          describe: 'Steamed red snapper with soya sauce',
          _id: '671df6201ae2a3ca3beec349',
        },
        {
          images: 'uploads/restaurants/dishes3-1730016814288.jpg',
          describe: 'Stir fried king crab legs in rock salt',
          _id: '671df62e1ae2a3ca3beec34f',
        },
        {
          images: 'uploads/restaurants/dishes4-1730016814289.jpg',
          describe:
            'Sticky rice soup with abalone and green bean Vietnamese mountain ginseng',
          _id: '671df62e1ae2a3ca3beec350',
        },
        {
          images: 'uploads/restaurants/dishes5-1730016825511.jpg',
          describe:
            'Steamed garrupa (Song Fish) with ginger leaf Vietnamese fresh noodles with soya sauce',
          _id: '671df6391ae2a3ca3beec358',
        },
      ],
    },
    {
      _id: 2,
      restaurant_name: 'Nhà hàng Le Palace',
      restaurant_decription:
      'Một sự kết hợp hoàn hảo giữa nét hiện đại và phóng khoáng, giữa sang trọng và quý phái. Tọa lạc tại tầng 3 của khách sạn, nhà hàng Le Palace được thiết kế với những ô cửa sổ lớn, đem lại cho thực khách một không gian ẩm thực vừa gần gũi với cảnh sắc Tam Đảo, vừa ấm cúng bên gia đình và những người thân yêu',
      restaurant_image: 'assets/image/window-1.jpg',
      restaurant_detail: {
        location: 'Tầng 3',
        guest: 150,
        menu_detail: 'Ala carte, Set menu',
        hours: '11:00 - 14:00',
      },
      restaurant_menu: [
        'Dimsum',
        'Vịt quay Bắc Kinh',
        'Nhất Phẩm Phật Khiêu Tường',
      ],
      restaurant_signature: [
        {
          images: 'uploads/restaurants/1-1730017102217.jpeg',
          describe: 'Dimsum',
          _id: '671df74e1ae2a3ca3beec361',
        },
        {
          images: 'uploads/restaurants/2-1730017102229.jpeg',
          describe: 'Vịt quay Bắc Kinh',
          _id: '671df74e1ae2a3ca3beec362',
        },
        {
          images: 'uploads/restaurants/3-1730017116130.jpeg',
          describe: 'Nhất Phẩm Phật Khiêu Tường',
          _id: '671df75c1ae2a3ca3beec368',
        },
      ],
    },
    {
      _id: 3,
      restaurant_name: 'Nhà hàng Les Amoureux',
      restaurant_decription:
        'Nằm tại khu vực sảnh chính của khách sạn, Les Amoureux là một lời chào ấm áp, dẫn đường cho du khách đến với thế giới nơi hòa quyện những xúc cảm của hiện tại và những hoài niệm của quá khứ về tình yêu ngọt ngào của đôi lứa.',
      restaurant_image: 'assets/image/Les-Amoureux-1.jpg',
      restaurant_detail: {
        location: 'Tầng 4',
        guest: 80,
        menu_detail: 'Drink, Set menu',
        hours: '10:00 - 21:00',
      },
      restaurant_menu: [
        'Lobster with seafood sauce',
        'Steamed red snapper with soya sauce',
        'Grilled oyster with onion oil',
        'Stir fried mountain chicken with rock salt',
        'Grilled Aus beef in DONG leaf',
        'Stir fried vegetables with mushroom',
        'Mushroom and lotus seed congee',
        'Baked lobster with cheese',
        'Steamed grouper with black mushroom',
      ],
      restaurant_signature: [
        {
          images: 'uploads/restaurants/juice1-1730017308653.jpg',
          describe: 'Sinh tố dưa hâú',
          _id: '671df81c1ae2a3ca3beec36f',
        },
        {
          images: 'uploads/restaurants/juice2-1730017308653.jpeg',
          describe: 'Cocktail hoa quả',
          _id: '671df81c1ae2a3ca3beec370',
        },
        {
          images: 'uploads/restaurants/juice3-1730017318581.png',
          describe: 'Nước ép lựu',
          _id: '671df8261ae2a3ca3beec376',
        },
      ],
    },
    {
      _id: 4,
      restaurant_name: 'Nhà hàng Le Ciel',
      restaurant_decription:
        'Tọa lạc tại tầng thượng của khách sạn, Le Ciel đưa khách hàng đến một không gian độc đáo – Một chạm đến thiên nhiên. Với tầm nhìn 360 độ, khách hàng có thể chiêm ngưỡng trọn vẹn vẻ đẹp mơ mộng của đất trời Tam Đảo.',
      restaurant_image: 'assets/image/sky-bar-1.jpg',
      restaurant_detail: {
        location: 'Tầng G',
        guest: 80,
        menu_detail: 'Drink, Set menu',
        hours: '10:00 - 21:00',
      },
      restaurant_menu: [
        'Royal Crab meat salad Spring vegetable with sesame cracker',
        'Sticky rice soup with abalone and green bean Vietnamese mountain ginseng',
        'Steamed garrupa (Song Fish) with ginger leaf Vietnamese fresh noodles',
        'Lobster with seafood sauce',
        'Steamed red snapper with soya sauce',
        'Grilled oyster with onion oil',
        'Stir fried mountain chicken with rock salt',
        'Grilled Aus beef in DONG leaf',
        'Stir fried vegetables with mushroom',
        'Mushroom and lotus seed congee',
        'Stir fried king crab legs in rock salt',
        'Baked lobster with cheese',
        'Stir fried king rock lobster in tamarind sauce',
        'Steamed grouper with black mushroom',
      ],
      restaurant_signature: [
        {
          images: 'uploads/restaurants/juice1-1730017765812.jpg',
          describe: 'Sinh tố dưa hâú',
          _id: '671df9e51ae2a3ca3beec37d',
        },
        {
          images: 'uploads/restaurants/dishes4-1730017765813.jpg',
          describe:
            'Sticky rice soup with abalone and green bean Vietnamese mountain ginseng',
          _id: '671df9e51ae2a3ca3beec37e',
        },
        {
          images: 'uploads/restaurants/2-1730017776940.jpeg',
          describe: 'Nhất Phẩm Phật Khiêu Tường',
          _id: '671df9f11ae2a3ca3beec384',
        },
      ],
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }
}
