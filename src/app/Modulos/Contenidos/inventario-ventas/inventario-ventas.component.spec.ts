import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioVentasComponent } from './inventario-ventas.component';

describe('InventarioVentasComponent', () => {
  let component: InventarioVentasComponent;
  let fixture: ComponentFixture<InventarioVentasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventarioVentasComponent]
    });
    fixture = TestBed.createComponent(InventarioVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
