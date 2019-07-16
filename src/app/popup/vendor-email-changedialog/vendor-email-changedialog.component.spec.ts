import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorEmailChangedialogComponent } from './vendor-email-changedialog.component';

describe('VendorEmailChangedialogComponent', () => {
  let component: VendorEmailChangedialogComponent;
  let fixture: ComponentFixture<VendorEmailChangedialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorEmailChangedialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorEmailChangedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
