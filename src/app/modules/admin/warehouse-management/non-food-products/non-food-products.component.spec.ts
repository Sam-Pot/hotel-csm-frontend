import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonFoodProductsComponent } from './non-food-products.component';

describe('NonFoodProductsComponent', () => {
  let component: NonFoodProductsComponent;
  let fixture: ComponentFixture<NonFoodProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NonFoodProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonFoodProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
