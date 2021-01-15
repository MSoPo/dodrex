import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from 'src/app/core/services/product.service';
import { CargaElement } from 'src/app/models/CargaElement';
import { Producto } from 'src/app/models/Producto';
import { ACTIVE_BLOCK, DEFAULT_DURATION } from '../../../core/Constantes';
import { AgregarProductoComponent } from '../../inventario/agregar-producto/agregar-producto.component';

@Component({
  selector: 'app-producto-carga',
  templateUrl: './producto-carga.component.html',
  styleUrls: ['./producto-carga.component.scss'],
})
export class ProductoCargaComponent implements OnInit {
  @Output() getProducto = new EventEmitter<any>();
  @Input()
  products!: CargaElement[];
  clave = new FormControl('');
  nombre = new FormControl('');
  options: string[] = [];
  filteredOptions!: string[];
  lastSearch = '';
  lstproductos = [];

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    public translate: TranslateService,
    public dialog: MatDialog,
    ) {
      translate.setDefaultLang('es');
    }

  ngOnInit(): void {
    this.nombre.valueChanges.subscribe((value) => {
      const val = value.trim();
      this.filter(val);
      if (val.length !== 4 || this.lastSearch === val) {
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
      prod.cantidad = prod.cantidad;
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
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AgregarProductoComponent, {
      width: '40%',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
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
