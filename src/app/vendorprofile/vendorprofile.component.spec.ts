import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorprofileComponent } from './vendorprofile.component';

describe('VendorprofileComponent', () => {
  let component: VendorprofileComponent;
  let fixture: ComponentFixture<VendorprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
