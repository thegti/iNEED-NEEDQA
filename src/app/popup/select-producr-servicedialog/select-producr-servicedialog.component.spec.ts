import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProducrServicedialogComponent } from './select-producr-servicedialog.component';

describe('SelectProducrServicedialogComponent', () => {
  let component: SelectProducrServicedialogComponent;
  let fixture: ComponentFixture<SelectProducrServicedialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectProducrServicedialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectProducrServicedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
