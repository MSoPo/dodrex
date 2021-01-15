import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { Carga } from 'src/app/models/Carga';
import { Venta } from 'src/app/models/Venta';
import { DetallesReporteCargaComponent } from '../detalles-reporte-carga/detalles-reporte-carga.component';

@Component({
  selector: 'app-tabla-reporte-carga',
  templateUrl: './tabla-reporte-carga.component.html',
  styleUrls: ['./tabla-reporte-carga.component.scss'],
})
export class TablaReporteCargaComponent {
  displayedColumns: string[] = [
    'fecha',
    'nombre_usuario',
    'total',
    'editar',
  ];
  dataSource = new MatTableDataSource<Carga>([]);
  sortData!: Carga[];

  constructor(public dialog: MatDialog, public translate: TranslateService) {
    translate.setDefaultLang('es');
  }

  handleVentaToList(cargas: Carga[]): void {
    console.log('cargas -> ', cargas);
    this.dataSource.data = cargas;
  }

  openDialog(e: Venta): void {
    const dialogRef = this.dialog.open(DetallesReporteCargaComponent, {
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
