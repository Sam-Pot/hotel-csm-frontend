import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesPanelComponent } from './tables-panel.component';

describe('TablesPanelComponent', () => {
  let component: TablesPanelComponent;
  let fixture: ComponentFixture<TablesPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablesPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
