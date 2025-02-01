import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantReservationDetailComponent } from './restaurant-reservation-detail.component';

describe('RestaurantReservationDetailComponent', () => {
  let component: RestaurantReservationDetailComponent;
  let fixture: ComponentFixture<RestaurantReservationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantReservationDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantReservationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
