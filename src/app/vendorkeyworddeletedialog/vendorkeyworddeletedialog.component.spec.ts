import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorkeyworddeletedialogComponent } from './vendorkeyworddeletedialog.component';

describe('VendorkeyworddeletedialogComponent', () => {
  let component: VendorkeyworddeletedialogComponent;
  let fixture: ComponentFixture<VendorkeyworddeletedialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorkeyworddeletedialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorkeyworddeletedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
