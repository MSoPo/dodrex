import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnirseaempresaComponent } from './unirseaempresa.component';

describe('UnirseaempresaComponent', () => {
  let component: UnirseaempresaComponent;
  let fixture: ComponentFixture<UnirseaempresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnirseaempresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnirseaempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
