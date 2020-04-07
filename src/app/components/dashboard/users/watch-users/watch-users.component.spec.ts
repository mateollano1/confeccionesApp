import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchUsersComponent } from './watch-users.component';

describe('WatchUsersComponent', () => {
  let component: WatchUsersComponent;
  let fixture: ComponentFixture<WatchUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
