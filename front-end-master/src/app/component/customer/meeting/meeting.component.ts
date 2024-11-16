import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrl: './meeting.component.css',
})
export class MeetingComponent implements OnInit, OnDestroy {
  images = [
    'assets/image/Amour-Ballroom-photo-1.jpg',
    'assets/image/Amour-Ballroom-photo-2.jpg',
    'assets/image/Amour-Ballroom-photo-3.jpg',
  ];
  currentIndex = 0;
  intervalId: any;
  transformStyle = 'translateX(0%)';

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextImage();
    }, 3000); // Change image every 3 seconds
  }

  stopAutoSlide() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateTransformStyle();
  }

  prevImage() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateTransformStyle();
  }

  updateTransformStyle() {
    this.transformStyle = `translateX(-${this.currentIndex * 100}%)`;
  }
}
