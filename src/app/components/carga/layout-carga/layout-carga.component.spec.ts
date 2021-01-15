import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutCargaComponent } from './layout-carga.component';

describe('LayoutCargaComponent', () => {
  let component: LayoutCargaComponent;
  let fixture: ComponentFixture<LayoutCargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutCargaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
