import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarUsuarioComponent } from './cambiar-usuario.component';

describe('CambiarUsuarioComponent', () => {
  let component: CambiarUsuarioComponent;
  let fixture: ComponentFixture<CambiarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambiarUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
