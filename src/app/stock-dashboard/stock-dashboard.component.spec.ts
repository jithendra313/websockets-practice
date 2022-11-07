
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { StockDashboardComponent } from './stock-dashboard.component';

describe('StockDashboardComponent', () => {
  let component: StockDashboardComponent;
  let fixture: ComponentFixture<StockDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ StockDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});