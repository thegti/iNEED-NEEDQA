import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextdialogComponent } from './nextdialog.component';

describe('NextdialogComponent', () => {
  let component: NextdialogComponent;
  let fixture: ComponentFixture<NextdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
