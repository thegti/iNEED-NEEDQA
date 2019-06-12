import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IhaveComponent } from './ihave.component';

describe('IhaveComponent', () => {
  let component: IhaveComponent;
  let fixture: ComponentFixture<IhaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IhaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IhaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
