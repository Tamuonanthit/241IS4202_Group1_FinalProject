import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  images = [
    'assets/image/homepage1.jpg',
    'assets/image/homepage2.jpg',
    'assets/image/homepage3.jpg'
  ];

  imageroom = [
    'assets/image/room1.png',
    'assets/image/room3.png',
    'assets/image/room4.png',
    'assets/image/room5.png',
    'assets/image/room6.png',
    'assets/image/room1.png',
    'assets/image/room3.png',
    'assets/image/room4.png'
  ];

  imageres = [
    'assets/image/res1.png',
    'assets/image/res2.png',
    'assets/image/res3.png',
    'assets/image/res4.png'
  ];
  // currentIndex = 0;
  // intervalId: any;
  // transformStyle = 'translateX(0%)';

  // ngOnInit() {
  //   this.startAutoSlide();
  // }

  // ngOnDestroy() {
  //   this.stopAutoSlide();
  // }

  // startAutoSlide() {
  //   this.intervalId = setInterval(() => {
  //     this.nextImage();
  //   }, 3000); // Change image every 3 seconds
  // }

  // stopAutoSlide() {
  //   if (this.intervalId) {
  //     clearInterval(this.intervalId);
  //   }
  // }

  // nextImage() {
  //   this.currentIndex = (this.currentIndex + 1) % this.images.length;
  //   this.updateTransformStyle();
  // }

  // prevImage() {
  //   this.currentIndex =
  //     (this.currentIndex - 1 + this.images.length) % this.images.length;
  //   this.updateTransformStyle();
  // }

  // updateTransformStyle() {
  //   this.transformStyle = `translateX(-${this.currentIndex * 100}%)`;
  // }
  currentIndex = 0;
  transformStyle = 'translateX(0%)';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.autoNextImage();
  }

  autoNextImage() {
    setInterval(() => {
      this.nextImage();
    }, 3000); // Change image every 3 seconds
  }

  prevImage() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 4; // Move 4 images back
    } else {
      this.currentIndex = this.imageroom.length - 4; // Go to the last set of 4 images
    }
    this.updateTransformStyle();
  }

  nextImage() {
    if (this.currentIndex < this.imageroom.length - 4) {
      this.currentIndex += 4; // Move 4 images forward
    } else {
      this.currentIndex = 0; // Go back to the first set of 4 images
    }
    this.updateTransformStyle();
  }

  updateTransformStyle() {
    this.transformStyle = `translateX(-${this.currentIndex * 25}%)`; // Adjust transform based on 4 images
  }
  navigateToRoom() {
    this.router.navigate(['/room']);
  }
  navigateToRes() {
    this.router.navigate(['/dining']);
  }
}