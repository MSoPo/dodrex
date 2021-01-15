import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ACTIVE_BLOCK } from 'src/app/core/Constantes';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { DetallePago } from 'src/app/models/DetallePago';
import { VentaPagos } from 'src/app/models/Pago';
import { DetallesComponent } from '../../reporte/detalles/detalles.component';
import { DetalleAbonoComponent } from '../detalle-abono/detalle-abono.component';
import { DetallesPagoComponent } from '../detalles-pago/detalles-pago.component';

@Component({
  selector: 'app-tabla-pago',
  templateUrl: './tabla-pago.component.html',
  styleUrls: ['./tabla-pago.component.scss']
})
export class TablaPagoComponent {

  displayedColumns: string[] = [
    'fecha',
    'cliente',
    'total',
    'deuda',
    'editar',
  ];
  dataSource = new MatTableDataSource<VentaPagos>([]);
  sortData!: VentaPagos[];

  constructor(public dialog: MatDialog, public translate: TranslateService, private clienteServcie: ClienteService) {
    translate.setDefaultLang('es');
  }

  handleVentaToList(ventas: VentaPagos[]): void {
    console.log('ventas -> ', ventas);
    this.dataSource.data = ventas;
  }

  openDialogPago(e: VentaPagos): void {
    const dialogRef = this.dialog.open(DetalleAbonoComponent, {
      width: '250px',
      data: e,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  openDialog(e: VentaPagos): void {
    ACTIVE_BLOCK.value = true;
    this.clienteServcie.getLstPago(e.id)
    .then(respu => {
      const lstPagos: DetallePago[] = [];
      ACTIVE_BLOCK.value = false;
      respu.forEach((element: { data: () => any, id: string }) => {
        lstPagos.push(element.data());
      });
      const dialogRef = this.dialog.open(DetallesPagoComponent, {
        width: '40%',
        data: { ventaPago: e, detalle: lstPagos }
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
      });
    }).catch(
      er => ACTIVE_BLOCK.value = false
    );
    
  }

  getTotalCost(): number {
    return this.dataSource.data.map((t) => t.deuda).reduce(
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
        case 'cliente':
          return compare(a.cliente, b.cliente, isAsc);
        case 'total':
          return compare(+a.pagoInicial, +b.pagoInicial, isAsc);
        case 'deuda':
          return compare(+a.deuda, +b.deuda, isAsc);
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
