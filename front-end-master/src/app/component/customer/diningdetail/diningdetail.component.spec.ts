import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiningdetailComponent } from './diningdetail.component';

describe('DiningdetailComponent', () => {
  let component: DiningdetailComponent;
  let fixture: ComponentFixture<DiningdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiningdetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiningdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
