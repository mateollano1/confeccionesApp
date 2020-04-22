import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePuntoVentaComponent } from './create-punto-venta.component';

describe('CreatePuntoVentaComponent', () => {
  let component: CreatePuntoVentaComponent;
  let fixture: ComponentFixture<CreatePuntoVentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePuntoVentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePuntoVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
