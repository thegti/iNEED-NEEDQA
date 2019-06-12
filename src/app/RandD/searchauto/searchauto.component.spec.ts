import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchautoComponent } from './searchauto.component';

describe('SearchautoComponent', () => {
  let component: SearchautoComponent;
  let fixture: ComponentFixture<SearchautoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchautoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchautoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
