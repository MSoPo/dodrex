import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosEmpresaConfigComponent } from './datos-empresa-config.component';

describe('DatosEmpresaConfigComponent', () => {
  let component: DatosEmpresaConfigComponent;
  let fixture: ComponentFixture<DatosEmpresaConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosEmpresaConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosEmpresaConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
