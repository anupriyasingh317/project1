import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionDetailsComponent } from './connection-details.component';

describe('ConnectionDetailsComponent', () => {
  let component: ConnectionDetailsComponent;
  let fixture: ComponentFixture<ConnectionDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectionDetailsComponent]
    });
    fixture = TestBed.createComponent(ConnectionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
