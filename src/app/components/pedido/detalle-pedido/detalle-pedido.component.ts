import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_DURATION } from 'src/app/core/Constantes';
import { PedidoService } from 'src/app/core/services/pedido.service';
import { DetalleVenta } from 'src/app/models/DetalleVenta';
import { Venta } from 'src/app/models/Venta';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.scss']
})
export class DetallePedidoComponent {

  productos: DetalleVenta[] | undefined;
  idVenta: string | undefined;
  cancelar = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Partial<Venta>,
    private pedidoService: PedidoService,
    public dialogRef: MatDialogRef<DetallePedidoComponent>,
    private snackBar: MatSnackBar,
    public translate: TranslateService
  ) {
    translate.setDefaultLang('es');
      this.productos = data.productos;
      this.idVenta = data.id;
     }

  borrar(){
    this.pedidoService.
    cancelPedido(this.idVenta ? this.idVenta : '').then(res => {
      this.SNACK('PEDIDO_CANCELADA', '');
      this.dialogRef.close();
    }).catch(er => {
      this.SNACK('ERROR_GRAL', 'ACEPTAR');
    });
  }

  venta(){}

  cancelarVenta() {
    this.cancelar = true;
  }

  regresardetalle() {
    this.cancelar = false;
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
