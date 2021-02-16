import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ACTIVE_BLOCK, DEFAULT_DURATION } from 'src/app/core/Constantes';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { VentaPagos } from 'src/app/models/Pago';

@Component({
  selector: 'app-detalle-abono',
  templateUrl: './detalle-abono.component.html',
  styleUrls: ['./detalle-abono.component.scss']
})
export class DetalleAbonoComponent {

  venta: VentaPagos;
  
  recibido = new FormControl(0);
  resto = new FormControl(0);
  valid: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: VentaPagos,
    private clienteService: ClienteService,
    public dialogRef: MatDialogRef<DetalleAbonoComponent>,
    private snackBar: MatSnackBar,
    public translate: TranslateService
  ) {
    translate.setDefaultLang('es');
    this.venta = data;
    this.resto.setValue(this.venta.deuda);
    this.valid = false;
  }

  ngOnInit(): void {
  }

  liquidar(): void {
    this.recibido.setValue(this.venta.deuda);
    this.resto.setValue(0);
    this.valid = true;
    this.pagar();
  }

  pagar(){
    if(this.valid){
      ACTIVE_BLOCK.value = true;
      this.clienteService.addPago(this.venta.id, this.recibido.value).then(res => {
        ACTIVE_BLOCK.value = false;
        this.dialogRef.close();
        this.SNACK('REGISTRO_OK', '');
        this.venta.deuda = this.resto.value;
      }).catch(er => {
        ACTIVE_BLOCK.value = false;
        this.SNACK('ERROR_GRAL', 'ACEPTAR')
      });
    }else{
      this.SNACK('ERROR_MONTO', 'ACEPTAR');
    }
    
  }

  calcularCambio(){
    this.valid = false;
    if( isNaN(this.recibido.value) || (this.recibido.value > this.venta.deuda) || this.recibido.value == 0){
      this.SNACK('ERROR_MONTO', 'ACEPTAR');
    }else{
      this.resto.setValue(this.venta.deuda - this.recibido.value);
      this.valid = true;
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
