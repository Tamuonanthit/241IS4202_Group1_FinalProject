import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingprocessComponent } from './bookingprocess.component';

describe('BookingprocessComponent', () => {
  let component: BookingprocessComponent;
  let fixture: ComponentFixture<BookingprocessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingprocessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
