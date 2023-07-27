import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionChartComponent } from './connection-chart.component';

describe('ConnectionChartComponent', () => {
  let component: ConnectionChartComponent;
  let fixture: ComponentFixture<ConnectionChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectionChartComponent]
    });
    fixture = TestBed.createComponent(ConnectionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
