import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ACTIVE_BLOCK, DEFAULT_DURATION } from 'src/app/core/Constantes';
import { PedidoService } from 'src/app/core/services/pedido.service';
import { Venta } from 'src/app/models/Venta';
import { DetallePedidoComponent } from './detalle-pedido/detalle-pedido.component';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent {

  displayedColumns: string[] = [
    'fecha',
    'nombre_cliente',
    'nombre_usuario',
    'total',
    'editar',
  ];
  dataSource = new MatTableDataSource<Venta>([]);
  sortData!: Venta[];

  constructor(public dialog: MatDialog, public translate: TranslateService, public pedidoService: PedidoService,
    public snackBar: MatSnackBar) {
    translate.setDefaultLang('es');
    ACTIVE_BLOCK.value = true;
    pedidoService.allPedidos().then(r => {
      const lstventas: Venta[] = [];
      r.forEach((element: { data: () => any; id: string }) => {
        lstventas.push({ ...element.data(), id: element.id });
      });
      this.dataSource.data = lstventas;
      if (lstventas.length < 1) {
        this.SNACK('ERROR_NO_RESULT', 'ACEPTAR');
      }
      ACTIVE_BLOCK.value = false;
    }).catch(er => {
      this.SNACK('ERROR_GRAL', 'ACEPTAR');
      ACTIVE_BLOCK.value = false;
    });
  }

  handleVentaToList(ventas: Venta[]): void {
    console.log('ventas -> ', ventas);
    this.dataSource.data = ventas;
  }

  openDialog(e: Venta): void {
    const dialogRef = this.dialog.open(DetallePedidoComponent, {
      width: '40%',
      data: e,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  sortDataMetod(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction == '') {
      this.sortData = data;
      return;
    }

    this.sortData = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'fecha':
          return compare(a.fecha, b.fecha, isAsc);
        case 'nombre_cliente':
          return compare(a.nombre_cliente, b.nombre_cliente, isAsc);
        case 'nombre_usuario':
          return compare(a.nombre_usuario, b.nombre_usuario, isAsc);
        case 'total':
          return compare(+a.total, +b.total, isAsc);
        default:
          return 0;
      }
    });
    this.dataSource.data = this.sortData;
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

function compare(a: any, b: any, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
