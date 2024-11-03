import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiningService } from '../../../service/dining.service';
import { DiningDetail } from '../../../interface/dining-detail';

@Component({
  selector: 'app-diningdetail',
  templateUrl: './diningdetail.component.html',
  styleUrl: './diningdetail.component.css'
})
export class DiningdetailComponent implements OnInit {
  diningId!: number;
  diningDetail: any;

  diningList = [
    {
      _id: 1,
      restaurant_name: 'Nhà hàng La Vie en Rose',
      restaurant_image: 'assets/image/La-Vie-En-Rose-Restaurant-2.jpg',
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
          images: 'assets/image/dishes1.png',
          describe: 'Royal Crab meat salad Spring vegetable with sesame cracker ',
          _id: '671df74e1ae2a3ca3beec361',
        },
        {
          images: 'assets/image/dishes2.png',
          describe: 'Steamed red snapper with soya sauce',
          _id: '671df6201ae2a3ca3beec349',
        },
        {
          images: 'assets/image/dishes3.png',
          describe: 'Stir fried king crab legs in rock salt',
          _id: '671df62e1ae2a3ca3beec34f',
        },
        {
          images: 'assets/image/dishes4.png',
          describe: 'Sticky rice soup with abalone and green bean Vietnamese mountain ginseng',
          _id: '671df62e1ae2a3ca3beec350',
        },
        {
          images: 'assets/image/dishes5.png',
          describe: 'Steamed garrupa (Song Fish) with ginger leaf Vietnamese fresh noodles with soya sauce',
          _id: '671df6391ae2a3ca3beec358',
        },
        {
          images: 'assets/image/dishes6.jpg',
          describe: 'Baked lobster with cheese',
          _id: '671df6391ae2a3ca3beec359',
        },
      ],
    },
    {
      _id: 2,
      restaurant_name: 'Nhà hàng Le Palace',
      restaurant_image: 'assets/image/Window-On-The-Park-Restaurant-2.jpg',
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
          images: 'assets/image/dimsum.png',
          describe: 'Dimsum',
          _id: '671df74e1ae2a3ca3beec361',
        },
        {
          images: 'assets/image/DIM-TU-TAC.png',
          describe: 'Vịt quay Bắc Kinh',
          _id: '671df74e1ae2a3ca3beec362',
        },
        {
          images: 'assets/image/phat-nhay-tuong-.jpg',
          describe: 'Nhất Phẩm Phật Khiêu Tường',
          _id: '671df75c1ae2a3ca3beec368',
        },
      ],
    },
    {
      _id: 3,
      restaurant_name: 'Nhà hàng Les Amoureux',
      restaurant_image: 'assets/image/Two-Lovers-Cafe-Terrace-2.jpg',
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
          images: 'assets/image/how-to-cook-frozen-red-snapper-1701541775.jpg',
          describe: 'Steamed red snapper with soya sauce',
          _id: '671df81c1ae2a3ca3beec36f',
        },
        {
          images: 'assets/image/STIR-FRY-MUSHROOM-MIXED-VEGETABLES.jpg',
          describe: 'Stir fried vegetables with mushroom',
          _id: '671df81c1ae2a3ca3beec370',
        },
        {
          images: 'assets/image/fried-moi-with-caramelized-basil-ginger-sauce.jpg',
          describe: 'Steamed grouper with black mushroom',
          _id: '671df8261ae2a3ca3beec376',
        },
      ],
    },
    {
      _id: 4,
      restaurant_name: 'Nhà hàng Le Ciel',
      restaurant_image: 'assets/image/Sky-Bar-Lounge-Tapas-6.jpg',
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
          images: 'assets/image/images.jpg',
          describe: 'Grilled Aus beef in DONG leaf',
          _id: '671df9e51ae2a3ca3beec37d',
        },
        {
          images: 'assets/image/Xoi-Xeo-Hanoi-Vietnamese-Sticky-Rice-with-Mung-Bean.jpg',
          describe:
            'Sticky rice soup with abalone and green bean Vietnamese mountain ginseng',
          _id: '671df9e51ae2a3ca3beec37e',
        },
        {
          images: 'assets/image/oysters-curry-recipe_0e40f412-751e-4bc5-9d4f-a363c6237853.jpg',
          describe: 'Grilled oyster with onion oil',
          _id: '671df9f11ae2a3ca3beec384',
        },
      ],
    },
  ];
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.diningId = Number(this.route.snapshot.paramMap.get('id'));
    this.diningDetail = this.diningList.find(dining => dining._id === this.diningId);
  }
  
}
