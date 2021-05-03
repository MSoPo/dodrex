import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ACTIVE_BLOCK, CLIENTEACTUAL, CLIENTES, CONFIG, DEFAULT_DURATION, VENTAACTUAL } from 'src/app/core/Constantes';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { DetalleVenta } from 'src/app/models/DetalleVenta';
import { Venta } from 'src/app/models/Venta';
import { VentaService } from 'src/app/core/services/venta.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {

  productos: DetalleVenta[] | undefined;
  idVenta: string | undefined;
  numeroVenta: number | undefined;
  usuario: string | undefined;
  cliente: string | undefined;
  cancelar = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Partial<Venta>,
    private router: Router,
    private clienteService: ClienteService,
    private ventaService: VentaService,
    public dialogRef: MatDialogRef<DetalleVenta>,
    private snackBar: MatSnackBar,
    public translate: TranslateService
  ) {
    translate.setDefaultLang('es');
      this.productos = data.productos;
      this.idVenta = data.id;
      this.usuario = data.nombre_usuario;
      this.cliente = data.nombre_cliente;
      this.numeroVenta = data.numero;
     }

  ngOnInit(): void {
  }

  imprimir(){
    CONFIG.reload = true;
    CONFIG.impresion = true;
    CONFIG.rutaRetorno = '/reporte';
    Object.assign(VENTAACTUAL, this.data);
    if(this.data.id_cliente){
      const cliente = CLIENTES.find(cl => cl.clave == this.data.id_cliente);
      Object.assign(CLIENTEACTUAL, cliente);
    }else{
      CLIENTEACTUAL.nombre = '';
      CLIENTEACTUAL.correo = '';
      CLIENTEACTUAL.direccion = '';
      CLIENTEACTUAL.telefono = '';
    }
            
    this.router.navigateByUrl('/nota', { skipLocationChange: true });
    this.dialogRef.close();
  }

  borrar(){
    ACTIVE_BLOCK.value = true;
    this.ventaService.cancelVenta(this.idVenta ? this.idVenta : '').then(res => {
      this.SNACK('VENTA_CANCELADA', '');
      this.dialogRef.close(this.idVenta);
      ACTIVE_BLOCK.value = false;
    }).catch(er => {
      this.SNACK('ERROR_GRAL', 'ACEPTAR');
      ACTIVE_BLOCK.value = false;
    });
  }

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
