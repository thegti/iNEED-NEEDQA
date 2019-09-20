import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatereportComponent } from './datereport.component';

describe('DatereportComponent', () => {
  let component: DatereportComponent;
  let fixture: ComponentFixture<DatereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
