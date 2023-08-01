import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPrendaComponent } from './registro-prenda.component';

describe('RegistroPrendaComponent', () => {
  let component: RegistroPrendaComponent;
  let fixture: ComponentFixture<RegistroPrendaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroPrendaComponent]
    });
    fixture = TestBed.createComponent(RegistroPrendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
