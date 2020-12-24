import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { ProductService } from 'src/app/core/services/product.service';
import { VentaElement } from 'src/app/models/ElementoVenta';
import { Producto } from 'src/app/models/Producto';
import { ACTIVE_BLOCK, DEFAULT_DURATION } from '../../../core/Constantes';

@Component({
  selector: 'app-producto-venta',
  templateUrl: './producto-venta.component.html',
  styleUrls: ['./producto-venta.component.scss'],
})
export class ProductoVentaComponent implements OnInit {
  @Output() getProducto = new EventEmitter<any>();
  @Input()
  products!: VentaElement[];
  clave = new FormControl('');
  nombre = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: string[];
  lastSearch = '';
  lstproductos = [];

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.nombre.valueChanges.subscribe((value) => {
      const val = value.trim();
      this.filter(val);
      if (val.length !== 4 || this.lastSearch === val) {
        return;
      } else {
        console.log(value);
        this.productService
          .getNombre(value)
          .then((res) => {
            this.lastSearch = value;
            this.lstproductos = res.docs;
            this.options = res.docs.map((m: { data: () => Producto }) => {
              return m.data().clave + ' | ' + m.data().nombre;
            });
            console.log(value);
            console.log(this.options);
            this.filter(value);
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    });
  }

  private filter(value: string): void {
    this.filteredOptions = this.options.filter((option) =>
      option.toLowerCase().includes(value)
    );
  }

  agregarNombre(e: number): void {
    if (e === 13) {
      const val = this.nombre.value.split('|', 1)[0].trim();
      if (val) {
        this.lstproductos.forEach((el: any) => {
          if (el && el.data().clave === val) {
            console.log(el.data().clave + '...' + val);
            this.getProducto.emit(el.data());
            this.nombre.setValue('');
          }
        });
      }
    }
  }

  agregarClave(e: number): void {
    if (e === 13) {
      this.buscarClave();
    }
  }

  buscarClave(): void {
    const existe = this.products.find((val) => val.clave === this.clave.value);
    if (existe) {
      const prod = { ...existe };
      prod.cantidad = prod.stock;
      this.getProducto.emit(prod);
      this.clave.setValue('');
      return;
    }
    ACTIVE_BLOCK.value = true;
    this.productService
      .getClave(this.clave.value)
      .then((querySnapshot) => {
        ACTIVE_BLOCK.value = false;
        switch (querySnapshot.size) {
          case 0:
            this.snackBar.open(
              `No existe la clave ${this.clave.value}`,
              undefined,
              DEFAULT_DURATION
            );
            return;
          case 1:
            this.getProducto.emit(querySnapshot.docs[0].data());
            this.clave.setValue('');
            console.log(querySnapshot.docs[0].data());
            return;
          default:
            this.snackBar.open(
              `El producto ${this.clave.value} tiene algún problema.`,
              undefined,
              DEFAULT_DURATION
            );
            return;
        }
      })
      .catch((err) => {
        ACTIVE_BLOCK.value = false;
        this.snackBar.open(err.message, undefined, DEFAULT_DURATION);
      });
  }
}
