import {
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ACTIVE_BLOCK, DEFAULT_DURATION, PRODUCTOS } from 'src/app/core/Constantes';
import { ProductService } from 'src/app/core/services/product.service';
import { Producto } from 'src/app/models/Producto';
import { AgregarProductoComponent } from '../agregar-producto/agregar-producto.component';

@Component({
  selector: 'app-filtros-inventario',
  templateUrl: './filtros-inventario.component.html',
  styleUrls: ['./filtros-inventario.component.scss'],
})
export class FiltrosInventarioComponent implements OnInit {
  @Output() getProducto = new EventEmitter<any>();
  clave = new FormControl('');
  nombre = new FormControl('');
  listas = new FormControl();

  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    public translate: TranslateService
  ) {
    translate.setDefaultLang('es');
  }

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AgregarProductoComponent, {
      width: '40%',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        PRODUCTOS.push(result);
      }
    });
  }

  buscarCodigo(e: number): void {
    if (e === 13) {
      const filterValue = this.clave.value;
      const lstPrd = PRODUCTOS.filter(prod => { 
        return prod.clave.includes(filterValue);
      });
      this.getProducto.emit(lstPrd);
    }
    /*if (e === 13) {
      this.nombre.setValue('');
      this.listas.setValue(0);
      ACTIVE_BLOCK.value = true;
      this.productService
        .getClaveAll(this.clave.value)
        .then((querySnapshot) => {
          ACTIVE_BLOCK.value = false;
          switch (querySnapshot.size) {
            case 0:
              this.SNACK('ERROR_NO_RESULT', 'ACEPTAR');
              return;
            case 1:
              this.getProducto.emit([querySnapshot.docs[0].data()]);
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
    }*/
  }

  buscarNombre(e: number): void {
    if (e === 13) {
      const filterValue = this.nombre.value ? this.nombre.value.toLowerCase() : '';
      const lstPrd = PRODUCTOS.filter(prod => { 
        return prod.nombre.includes(filterValue);
      });
      this.getProducto.emit(lstPrd);
    }
    /*
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
          this.SNACK('ERROR_GRAL', 'ACEPTAR');
        });
    }*/
  }

  getFavs(): void {
      const lstPrd = PRODUCTOS.filter((prod: Producto) => { 
        return prod.favorito;
      });
      this.getProducto.emit(lstPrd);
    /*ACTIVE_BLOCK.value = true;
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
        this.SNACK('ERROR_GRAL', 'ACEPTAR');
      });*/
  }

  getStockBajo(): void {
    const lstPrd = PRODUCTOS.filter((prod: Producto) => { 
      return prod.cantidad <= 10;
    });
    this.getProducto.emit(lstPrd);
    /*
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
        this.SNACK('ERROR_GRAL', 'ACEPTAR');
      });*/
  }

  getAgotados(): void {
    const lstPrd = PRODUCTOS.filter((prod: Producto) => { 
      return prod.cantidad <= 0;
    });
    this.getProducto.emit(lstPrd);
    /*ACTIVE_BLOCK.value = true;
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
        this.SNACK('ERROR_GRAL', 'ACEPTAR');
      });*/
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
        this.SNACK('ERROR_GRAL', 'ACEPTAR');
      });
  }

  validarLista(querySnapshot: any): void {
    const lstProd: any[] = [];
    if (querySnapshot) {
      querySnapshot.forEach((element: { data: () => any }) => {
        lstProd.push(element.data());
      });
      this.getProducto.emit(lstProd);
      /*if (lstProd.length > 0) {
        this.getProducto.emit(lstProd);
      } else {
        this.SNACK('ERROR_NO_RESULT', 'ACEPTAR');
      }*/
    } else {
      this.SNACK('ERROR_NO_RESULT', 'ACEPTAR');
    }
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
