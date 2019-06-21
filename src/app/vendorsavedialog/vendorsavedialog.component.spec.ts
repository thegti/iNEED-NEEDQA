import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorsavedialogComponent } from './vendorsavedialog.component';

describe('VendorsavedialogComponent', () => {
  let component: VendorsavedialogComponent;
  let fixture: ComponentFixture<VendorsavedialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorsavedialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorsavedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
