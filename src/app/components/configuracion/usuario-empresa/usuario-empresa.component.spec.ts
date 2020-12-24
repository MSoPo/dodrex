import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioEmpresaComponent } from './usuario-empresa.component';

describe('UsuarioEmpresaComponent', () => {
  let component: UsuarioEmpresaComponent;
  let fixture: ComponentFixture<UsuarioEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
