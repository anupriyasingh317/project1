import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionEditComponent } from './connection-edit.component';

describe('ConnectionEditComponent', () => {
  let component: ConnectionEditComponent;
  let fixture: ComponentFixture<ConnectionEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectionEditComponent]
    });
    fixture = TestBed.createComponent(ConnectionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
