import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from 'src/app/core/services/product.service';
import { VentaElement } from 'src/app/models/ElementoVenta';
import { Producto } from 'src/app/models/Producto';
import { ACTIVE_BLOCK, DEFAULT_DURATION, PRODUCTOS } from '../../../core/Constantes';

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
  options: string[] = [];
  filteredOptions!: string[];
  lastSearch = '';
  lstproductos = [];

  constructor(
    private snackBar: MatSnackBar,
    public translate: TranslateService
    ) {
      translate.setDefaultLang('es');
    }

  ngOnInit(): void {
    this.nombre.valueChanges.subscribe((value) => {
      if(!this.options.length){
        this.options = PRODUCTOS.map((m) => {
          return m.clave + ' | ' + m.nombre;
        });
      }
      const val = value.trim();
      this.filter(val);
      /*if (val.length !== 4 || this.lastSearch === val) {
        return;
      } else {
        this.productService
          .getNombre(value)
          .then((res) => {
            this.lastSearch = value;
            this.lstproductos = res.docs;
            this.options = res.docs.map((m: { data: () => Producto }) => {
              return m.data().clave + ' | ' + m.data().nombre;
            });
            this.filter(value);
          })
          .catch((error) => {
            console.log(error.message);
          });
      }*/
    });
  }

  private filter(value: string): void {
    this.filteredOptions = this.options.filter((option) =>
      option.toLowerCase().includes(value)
    ).slice(0, 10);
  }

  agregarNombre(e: number): void {
    if (e === 13) {
      const val = this.nombre.value.split('|', 1)[0].trim();
      if (val) {
        const producto = PRODUCTOS.filter(p => p.clave === val).values().next().value;
        console.log(producto);
        if(!producto) {
          this.SNACK('ERROR_NO_RESULT', 'ACEPTAR');
          return;
        }
        this.getProducto.emit(producto);
        this.nombre.setValue('');
        /*this.lstproductos.forEach((el: any) => {
          if (el && el.data().clave === val) {
            this.getProducto.emit(el.data());
            this.nombre.setValue('');
          }
        });/*/
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
    const producto = PRODUCTOS.filter(p => p.clave === this.clave.value).values().next().value;
    if(!producto) {
      this.SNACK('ERROR_NO_RESULT', 'ACEPTAR');
      return;
    }
    console.log(producto);
    this.getProducto.emit(producto);
    this.clave.setValue('');
    /*this.productService
      .getClave(this.clave.value)
      .then((querySnapshot) => {
        ACTIVE_BLOCK.value = false;
        switch (querySnapshot.size) {
          case 0:
            this.SNACK('ERROR_NO_RESULT', 'ACEPTAR');
            return;
          case 1:
            this.getProducto.emit(querySnapshot.docs[0].data());
            this.clave.setValue('');
            console.log(querySnapshot.docs[0].data());
            return;
          default:
            this.SNACK('ERROR_DATOS', 'ACEPTAR');
            return;
        }
      })
      .catch((err) => {
        ACTIVE_BLOCK.value = false;
        this.SNACK('ERROR_GRAL', 'ACEPTAR');
      });*/
  }

  TRANSLATE(str: string) {
    return str ? this.translate.instant(str) : '';
  }

  SNACK(msj: string, btm: string) {
    this.snackBar.open(
      this.TRANSLATE(msj),
      this.TRANSLATE(btm),
      DEFAULT_DURATION
    );
  }
   
}
