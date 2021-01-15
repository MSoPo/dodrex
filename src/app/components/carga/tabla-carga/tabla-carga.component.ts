import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/Producto';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  DEFAULT_DURATION,
  USER_ACTIVE,
} from 'src/app/core/Constantes';
import { Carga } from 'src/app/models/Carga';
import { DetalleVenta } from 'src/app/models/DetalleVenta';
import { MatDialog } from '@angular/material/dialog';
import { ResumenCargaComponent } from '../resumen-carga/resumen-carga.component';
import { TranslateService } from '@ngx-translate/core';
import { CargaElement } from 'src/app/models/CargaElement';


@Component({
  selector: 'app-tabla-carga',
  templateUrl: './tabla-carga.component.html',
  styleUrls: ['./tabla-carga.component.scss'],
})
export class TablaCargaComponent {
  displayedColumns: string[] = [
    'nombre',
    'cantidad',
    'precio',
    'subtotal',
    'quitar',
  ];
  ELEMENT_DATA: CargaElement[] = [];
  dataSource = new MatTableDataSource<CargaElement>(this.ELEMENT_DATA);
  options: string[] = [];
  filteredOptions!: string[];
  lastSearch = '';

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public translate: TranslateService
  ) {
    translate.setDefaultLang('es');
  }

  /** Gets the total cost of all transactions. */
  getTotalCost(): number {
    return this.ELEMENT_DATA.map((t) => t.subtotal).reduce(
      (acc, value) => acc + value,
      0
    );
  }

  addCantidad(event: any, element: CargaElement): void {
    let valor = event.target.value;
    if (isNaN(valor)) {
      this.SNACK('ERROR_CANTIDAD', 'ACEPTAR');
      element.cantidad = 1;
    } else {
      valor = Number(valor);
      if (Number.isInteger(valor) && valor > 0) {
        element.cantidad = valor;
      } else {
        this.SNACK('ERROR_VAL_CANT', 'ACEPTAR');
        element.cantidad = valor >= 1 ? Math.trunc(valor) : 1;
      }
      element.subtotal = element.precio * element.cantidad;
      this.dataSource.data = this.ELEMENT_DATA;
    }
  }

  handleProductAddToVenta(product: Producto): void {
    console.log('product -> ', product);
    const valEx = this.ELEMENT_DATA.find((val) => val.clave === product.clave);
    if (valEx) {
      valEx.cantidad++;
      valEx.subtotal = valEx.cantidad * valEx.precio;
      this.dataSource.data = this.ELEMENT_DATA;
      return;
    }

    const elemet: CargaElement = {
      cantidad: 1,
      nombre: product.nombre,
      precio: product.precio_compra,
      subtotal: product.precio_compra,
      clave: product.clave
    };
    this.ELEMENT_DATA.push(elemet);
    this.dataSource.data = this.ELEMENT_DATA;
  }

  pagar(): void {
    const detallesVenta: DetalleVenta[] = [];
    console.log(this.ELEMENT_DATA);
    this.ELEMENT_DATA.forEach((el) => {
      const det: DetalleVenta = {
        id: el.clave,
        subtotal: el.subtotal,
        cantidad: el.cantidad,
        nombre: el.nombre,
      };

      detallesVenta.push(det);
    });

    const carga: Carga = {
      fecha: new Date(),
      id_usuario: USER_ACTIVE.id,
      nombre_usuario: USER_ACTIVE.nombre,
      productos: detallesVenta,
      total: this.getTotalCost(),
    };
    this.openDialog(carga);
  }

  quitar(element: CargaElement): void{
    const idx = this.ELEMENT_DATA.findIndex((el) => el.clave===element.clave);
    this.ELEMENT_DATA.splice(idx, 1);
    this.dataSource.data = this.ELEMENT_DATA;
  }

  openDialog(carga: Carga): void {
    const dialogRef = this.dialog.open(ResumenCargaComponent, {
      width: '250px',
      data: { ...carga },
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
