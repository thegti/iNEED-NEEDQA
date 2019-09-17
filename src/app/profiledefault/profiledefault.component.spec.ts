import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfiledefaultComponent } from './profiledefault.component';

describe('ProfiledefaultComponent', () => {
  let component: ProfiledefaultComponent;
  let fixture: ComponentFixture<ProfiledefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfiledefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfiledefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
