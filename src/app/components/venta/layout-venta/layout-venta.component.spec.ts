import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutVentaComponent } from './layout-venta.component';

describe('LayoutVentaComponent', () => {
  let component: LayoutVentaComponent;
  let fixture: ComponentFixture<LayoutVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutVentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
