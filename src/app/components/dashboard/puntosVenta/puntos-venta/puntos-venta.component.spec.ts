import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntosVentaComponent } from './puntos-venta.component';

describe('PuntosVentaComponent', () => {
  let component: PuntosVentaComponent;
  let fixture: ComponentFixture<PuntosVentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuntosVentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntosVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
