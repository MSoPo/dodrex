import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteClienteComponent } from './autocomplete-cliente.component';

describe('AutocompleteClienteComponent', () => {
  let component: AutocompleteClienteComponent;
  let fixture: ComponentFixture<AutocompleteClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutocompleteClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
