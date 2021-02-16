import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core'
import { ACTIVE_BLOCK, CLIENTES, DEFAULT_DURATION } from 'src/app/core/Constantes';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { Cliente } from 'src/app/models/Cliente';
import { VentaPagos } from 'src/app/models/Pago';

@Component({
  selector: 'app-filtros-reporte-pagos',
  templateUrl: './filtros-reporte-pagos.component.html',
  styleUrls: ['./filtros-reporte-pagos.component.scss']
})
export class FiltrosReportePagosComponent {

  @Output() getVentas = new EventEmitter<any>();

  cliente = new FormControl();
  especial = new FormControl();

  lstPagosVenta: VentaPagos[] = [];
  lstCliente: Cliente[] = [];

  constructor(
    private clienteService: ClienteService,
    private snackBar: MatSnackBar,
    public translate: TranslateService
  ) {
    translate.setDefaultLang('es');
    ACTIVE_BLOCK.value = true;
    this.clienteService.getPagoDeuda().then((respu) => {
      respu.forEach((element: { data: () => any, id: string }) => {
        this.lstPagosVenta.push({id: element.id, ...element.data()});
      });
      this.getVentas.emit(this.lstPagosVenta);
      ACTIVE_BLOCK.value = false;
    }).catch(er => {
      this.SNACK('ERROR_GRAL', 'ACEPTAR');
      ACTIVE_BLOCK.value = false;
    });

    this.lstCliente = CLIENTES;
  }

  buscar(): void {
    this.lstPagosVenta = [];
    ACTIVE_BLOCK.value = true;
    if (this.especial.value == 1) {
      this.clienteService.getPagoLiquidado().then((respu) => {
        respu.forEach((element: { data: () => any, id: string }) => {
          this.lstPagosVenta.push({id: element.id, ...element.data()});
          ACTIVE_BLOCK.value = false;
        });
        this.getVentas.emit(this.lstPagosVenta);
      }).catch(err => {
        this.SNACK('ERROR_GRAL', 'ACEPTAR');
        ACTIVE_BLOCK.value = false;
      });
      return;
    }
    if(this.cliente.value && this.cliente.value != '-1' && this.cliente.value !='0'){
      this.clienteService.getPagoCliente(this.cliente.value).then((respu) => {
        respu.forEach((element: { data: () => any, id: string }) => {
          this.lstPagosVenta.push({id: element.id, ...element.data()});
        });
        this.getVentas.emit(this.lstPagosVenta);
        ACTIVE_BLOCK.value = false;
      }).catch(err => {
        this.SNACK('ERROR_GRAL', 'ACEPTAR');
        ACTIVE_BLOCK.value = false;
        });
    }else{
      this.clienteService.getPagoDeuda().then((respu) => {
        respu.forEach((element: { data: () => any, id: string }) => {
          this.lstPagosVenta.push({id: element.id, ...element.data()});
        });
        this.getVentas.emit(this.lstPagosVenta);
        ACTIVE_BLOCK.value = false;
      }).catch(err => {
        this.SNACK('ERROR_GRAL', 'ACEPTAR');
        ACTIVE_BLOCK.value = false;
      })
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
