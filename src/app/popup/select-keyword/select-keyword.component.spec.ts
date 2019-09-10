import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectKeywordComponent } from './select-keyword.component';

describe('SelectKeywordComponent', () => {
  let component: SelectKeywordComponent;
  let fixture: ComponentFixture<SelectKeywordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectKeywordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectKeywordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
