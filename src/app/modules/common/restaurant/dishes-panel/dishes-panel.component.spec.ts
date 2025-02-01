import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishesPanelComponent } from './dishes-panel.component';

describe('DishesPanelComponent', () => {
  let component: DishesPanelComponent;
  let fixture: ComponentFixture<DishesPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishesPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DishesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
