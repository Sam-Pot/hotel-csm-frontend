import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantPanelComponent } from './restaurant-panel.component';

describe('RestaurantPanelComponent', () => {
  let component: RestaurantPanelComponent;
  let fixture: ComponentFixture<RestaurantPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
