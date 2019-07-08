import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorlistingComponent } from './vendorlisting.component';

describe('VendorlistingComponent', () => {
  let component: VendorlistingComponent;
  let fixture: ComponentFixture<VendorlistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorlistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorlistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
