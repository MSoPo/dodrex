import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { Venta } from 'src/app/models/Venta';
import { DetallesComponent } from '../detalles/detalles.component';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss'],
})
export class TablaComponent {
  displayedColumns: string[] = [
    'fecha',
    'nombre_cliente',
    'nombre_usuario',
    'formaPago',
    'total',
    'editar',
  ];
  dataSource = new MatTableDataSource<Venta>([]);
  sortData!: Venta[];

  constructor(public dialog: MatDialog, public translate: TranslateService) {
    translate.setDefaultLang('es');
  }

  handleVentaToList(ventas: Venta[]): void {
    console.log('ventas -> ', ventas);
    this.dataSource.data = ventas;
  }

  openDialog(e: Venta): void {
    const dialogRef = this.dialog.open(DetallesComponent, {
      width: '40%',
      data: e,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  getTotalCost(): number {
    return this.dataSource.data.map((t) => t.total).reduce(
      (acc, value) => acc + value,
      0
    );
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
}

function compare(a: any, b: any, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
