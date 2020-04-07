import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchUserComponent } from './watch-user.component';

describe('WatchUserComponent', () => {
  let component: WatchUserComponent;
  let fixture: ComponentFixture<WatchUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
