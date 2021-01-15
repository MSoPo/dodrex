import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ACTIVE_BLOCK, DEFAULT_DURATION, VENTAACTUAL } from 'src/app/core/Constantes';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { VentaService } from 'src/app/core/services/venta.service';
import { Venta } from 'src/app/models/Venta';

@Component({
  selector: 'app-resumen-venta',
  templateUrl: './resumen-venta.component.html',
  styleUrls: ['./resumen-venta.component.scss'],
})
export class ResumenVentaComponent {
  recibido = new FormControl(0);
  formaPago = new FormControl(1);
  pagoInicial = new FormControl(0);
  cambio = 0;
  valid = false;

  constructor(
    public dialogRef: MatDialogRef<ResumenVentaComponent>,
    @Inject(MAT_DIALOG_DATA) public venta: Venta,
    private snackBar: MatSnackBar, private ventaService: VentaService,
    private clienteService: ClienteService,
    private router: Router,
    public translate: TranslateService
  ) {
    translate.setDefaultLang('es');
  }

  onNoClick(impresion: boolean): void {
    if(this.formaPago.value === 3 && !this.venta.id_cliente){
      this.SNACK('ERROR_PAGOS', 'ACEPTAR');
      return;
    }
    if (this.valid) {
      this.venta.formaPago = this.formaPago.value;
        ACTIVE_BLOCK.value = true;

        this.ventaService.getFolio().then(res => {
          const folio = res.data();
          console.log(folio);
          this.venta.numero = folio.folioVenta;
          this.ventaService.add(this.venta).then(resp => {
            ACTIVE_BLOCK.value = false;
            this.snackBar.open(this.translate.instant('VENTA_OK', { id: this.venta.numero }), '', DEFAULT_DURATION);
            this.dialogRef.close();
            if(this.formaPago.value === 3){
              this.clienteService.addVentaPagos(this.venta, this.pagoInicial.value).catch(() => this.SNACK('ERROR_PAG', 'ACEPTAR'));
            }
            if(impresion){
              Object.assign(VENTAACTUAL, this.venta);
              VENTAACTUAL.id = resp.id;
              this.router.navigateByUrl('/nota', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/ventas']);
              }); 
            }else {
              this.router.navigateByUrl('/reload', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/ventas']);
              }); 
            }
          }).catch(err => {
            ACTIVE_BLOCK.value = false;
            this.SNACK('ERROR_GRAL', 'ACEPTAR');
          });
        }).catch(er => this.SNACK('ERROR_GARL', 'ACEPTAR'));
    } else {
      this.SNACK('ERROR_MONTO', 'ACEPTAR');
    }
  }

  resetValor(e: any): void{
    if(e.value === 1) { this.valid = false }
    else if(e.value === 2){ this.valid = true }
    else if(e.value === 3){ this.valid = true }
    this.pagoInicial.setValue(0);
    this.recibido.setValue(0);
    this.cambio = 0;
  }

  calcularCambio(): void {
    if (!isNaN(this.recibido.value) && this.recibido.value) {
      this.cambio = Number(this.recibido.value) - this.venta.total;
      this.valid = true;
      if(this.cambio < 0) { this.cambio = 0; this.valid = false }
    } else {
      this.cambio = 0; this.valid = false;
    }
  }

  validarPagoInicial(): void {
    if (!isNaN(this.pagoInicial.value) && this.pagoInicial.value && this.pagoInicial.value >= 0) {
      if(this.pagoInicial.value >= this.venta.total) { this.valid = false }
      else { this.valid = true }
    } else {
      this.cambio = 0; this.valid = false;
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
    )
  }
   
}
