import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateSupplierComponent } from './activate-supplier.component';

describe('ActivateSupplierComponent', () => {
  let component: ActivateSupplierComponent;
  let fixture: ComponentFixture<ActivateSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivateSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
