import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ACTIVE_BLOCK, DEFAULT_DURATION } from 'src/app/core/Constantes';
import { ProductService } from 'src/app/core/services/product.service';
import { Venta } from 'src/app/models/Venta';
import { AgregarProductoComponent } from '../agregar-producto/agregar-producto.component';

@Component({
  selector: 'app-filtros-inventario',
  templateUrl: './filtros-inventario.component.html',
  styleUrls: ['./filtros-inventario.component.scss'],
})
export class FiltrosInventarioComponent implements OnInit {
  @Output() getProducto = new EventEmitter<any>();
  clave = new FormControl();
  nombre = new FormControl();
  listas = new FormControl();

  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AgregarProductoComponent, {
      width: '40%',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  buscarCodigo(e: number): void {
    if (e === 13) {
      this.nombre.setValue('');
      this.listas.setValue(0);
      ACTIVE_BLOCK.value = true;
      this.productService
        .getClaveAll(this.clave.value)
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
              this.getProducto.emit([querySnapshot.docs[0].data()]);
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
          this.snackBar.open(err.message, 'Aceptar', DEFAULT_DURATION);
        });
    }
  }

  buscarNombre(e: number): void {
    if (e === 13) {
      this.clave.setValue('');
      this.listas.setValue(0);
      ACTIVE_BLOCK.value = true;
      this.productService
        .getNombre(this.nombre.value)
        .then((querySnapshot) => {
          ACTIVE_BLOCK.value = false;
          this.validarLista(querySnapshot);
        })
        .catch((err) => {
          ACTIVE_BLOCK.value = false;
          this.snackBar.open(err.message, 'Aceptar', DEFAULT_DURATION);
        });
    }
  }

  getFavs(): void {
    ACTIVE_BLOCK.value = true;
    this.clave.setValue('');
    this.nombre.setValue('');
    this.productService
      .getFavorite()
      .then((querySnapshot) => {
        ACTIVE_BLOCK.value = false;
        this.validarLista(querySnapshot);
      })
      .catch((err) => {
        ACTIVE_BLOCK.value = false;
        this.snackBar.open(err.message, undefined, DEFAULT_DURATION);
      });
  }

  getStockBajo(): void {
    ACTIVE_BLOCK.value = true;
    this.clave.setValue('');
    this.nombre.setValue('');
    this.productService
      .getStockBajo()
      .then((querySnapshot) => {
        ACTIVE_BLOCK.value = false;
        this.validarLista(querySnapshot);
      })
      .catch((err) => {
        ACTIVE_BLOCK.value = false;
        this.snackBar.open(err.message, 'Aceptar', DEFAULT_DURATION);
      });
  }

  getAgotados(): void {
    ACTIVE_BLOCK.value = true;
    this.clave.setValue('');
    this.nombre.setValue('');
    this.productService
      .getAgotado()
      .then((querySnapshot) => {
        ACTIVE_BLOCK.value = false;
        this.validarLista(querySnapshot);
      })
      .catch((err) => {
        ACTIVE_BLOCK.value = false;
        this.snackBar.open(err.message, 'Aceptar', DEFAULT_DURATION);
      });
  }

  getCancelado(): void {
    ACTIVE_BLOCK.value = true;
    this.clave.setValue('');
    this.nombre.setValue('');
    this.productService
      .getCancelado()
      .then((querySnapshot) => {
        ACTIVE_BLOCK.value = false;
        this.validarLista(querySnapshot);
      })
      .catch((err) => {
        ACTIVE_BLOCK.value = false;
        this.snackBar.open(err.message, 'Aceptar', DEFAULT_DURATION);
      });
  }

  validarLista(querySnapshot: any): void {
    const lstProd: any[] = [];
    if (querySnapshot) {
      querySnapshot.forEach((element: { data: () => any }) => {
        lstProd.push(element.data());
      });
      if (lstProd.length > 0) {
        this.getProducto.emit(lstProd);
      } else {
        this.snackBar.open(
          'No se encontraron productos.',
          'Aceptar',
          DEFAULT_DURATION
        );
      }
    } else {
      this.snackBar.open(
        'No se encontraron productos.',
        'Aceptar',
        DEFAULT_DURATION
      );
    }
  }
}
