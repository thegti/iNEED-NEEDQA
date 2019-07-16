import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPersonalBusinessdialogComponent } from './select-personal-businessdialog.component';

describe('SelectPersonalBusinessdialogComponent', () => {
  let component: SelectPersonalBusinessdialogComponent;
  let fixture: ComponentFixture<SelectPersonalBusinessdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPersonalBusinessdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPersonalBusinessdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
