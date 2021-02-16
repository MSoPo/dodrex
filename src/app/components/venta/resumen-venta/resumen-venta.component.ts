import { Identifiers } from '@angular/compiler/src/render3/r3_identifiers';
import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  DEFAULT_DURATION,
  CONFIG,
  VENTAACTUAL,
  FOLIO_VENTA,
  VENTA_PENDIENTE,
  PRODUCTOS,
  FOLIO_ANTETRIO,
} from 'src/app/core/Constantes';
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
  entrega = new FormControl(1);
  cambio = 0;
  valid = false;

  constructor(
    public dialogRef: MatDialogRef<ResumenVentaComponent>,
    @Inject(MAT_DIALOG_DATA) public venta: Venta,
    private snackBar: MatSnackBar,
    private ventaService: VentaService,
    private clienteService: ClienteService,
    private router: Router,
    public translate: TranslateService
  ) {
    translate.setDefaultLang('es');
  }

  onNoClick(impresion: boolean): void {
    if (this.formaPago.value === 3 && !this.venta.id_cliente) {
      this.SNACK('ERROR_PAGOS', 'ACEPTAR');
      return;
    }
    if (this.valid) {
      this.venta.formaPago = this.formaPago.value;
      this.venta.entrega = this.entrega.value;
      this.venta.numero = Number(this.validaFolio());
      this.guardarVenta();
      this.SNACKVENTA(this.venta.numero);
      this.dialogRef.close();
      if (this.formaPago.value === 3) {
        this.agregarPagos(this.venta, this.pagoInicial.value);
        this.venta.pagoInicial = this.pagoInicial.value;
      }
      CONFIG.reload = true;
      CONFIG.rutaRetorno = '/ventas';
      if (impresion) {
        CONFIG.impresion = true;
        Object.assign(VENTAACTUAL, this.venta);
      }
      this.router.navigateByUrl('/nota', { skipLocationChange: true });
      FOLIO_ANTETRIO.value = FOLIO_VENTA.value;
      FOLIO_VENTA.value++;
    } else {
      this.SNACK('ERROR_MONTO', 'ACEPTAR');
    }
  }

  resetValor(e: any): void {
    if (e.value === 1) {
      this.valid = false;
    } else if (e.value === 2) {
      this.valid = true;
    } else if (e.value === 3) {
      this.valid = true;
    }
    this.pagoInicial.setValue(0);
    this.recibido.setValue(0);
    this.cambio = 0;
  }

  calcularCambio(): void {
    if (!isNaN(this.recibido.value) && this.recibido.value) {
      this.cambio = Number(this.recibido.value) - this.venta.total;
      this.valid = true;
      if (this.cambio < 0) {
        this.cambio = 0;
        this.valid = false;
      }
    } else {
      this.cambio = 0;
      this.valid = false;
    }
  }

  validarPagoInicial(): void {
    if (
      !isNaN(this.pagoInicial.value) &&
      this.pagoInicial.value &&
      this.pagoInicial.value >= 0
    ) {
      if (this.pagoInicial.value >= this.venta.total) {
        this.valid = false;
      } else {
        this.valid = true;
      }
    } else {
      this.cambio = 0;
      this.valid = false;
    }
  }

  validaFolio(): any{
    if(FOLIO_VENTA.value > FOLIO_ANTETRIO.value){
      return FOLIO_VENTA.value;
    }else{
      FOLIO_VENTA.value++;
      return this.validaFolio();
    }
  }

  guardarVenta(): void {
    this.venta.productos.forEach(producto => {
      const prod = PRODUCTOS.find(p => p.clave === producto.id);
      if(prod){
        prod.cantidad -= producto.cantidad; 
      }
    });
    this.ventaService
    .add(this.venta)
    .then((resp) => {
      this.ventaService.getFolio().subscribe((val) => {
        FOLIO_VENTA.value = val.folioVenta;
      });
    })
    .catch((error) => {
      this.venta.error = error;
      this.venta.error.mensaje = error.message;
      VENTA_PENDIENTE.push(this.venta);
      this.SNACK('ERROR_GRAL', 'ACEPTAR');
    });
  }

  agregarPagos(venta: Venta, pagoInicial: number): void {
    this.clienteService
    .addVentaPagos(venta, pagoInicial)
    .catch(() => this.SNACK('ERROR_PAG', 'ACEPTAR'));
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

  SNACKVENTA(id: number) {
    this.snackBar.open(
      this.translate.instant('VENTA_OK', { id:  id}),
      '',
      DEFAULT_DURATION
    );
  }
}
