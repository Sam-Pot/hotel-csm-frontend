import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantReservationsPanelComponent } from './restaurant-reservations-panel.component';

describe('RestaurantReservationsPanelComponent', () => {
  let component: RestaurantReservationsPanelComponent;
  let fixture: ComponentFixture<RestaurantReservationsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantReservationsPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantReservationsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
