import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CLIENTEACTUAL, DEFAULT_DURATION, VENTAACTUAL } from 'src/app/core/Constantes';
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
    Object.assign(VENTAACTUAL, this.data);
    if(this.data.id_cliente){
      this.clienteService.getClave(this.data.id_cliente).then(res => {
        CLIENTEACTUAL.correo = '';
        res.forEach((element: { data: () => any; }) => {
          Object.assign(CLIENTEACTUAL, element.data());
        });
        
        this.router.navigateByUrl('/nota', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/reporte']);});
      }).catch();
    }else{
      CLIENTEACTUAL.nombre = '';
      CLIENTEACTUAL.correo = '';
      this.router.navigateByUrl('/nota', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/reporte']);});
    }
    this.dialogRef.close();
  }

  borrar(){
    this.ventaService.cancelVenta(this.idVenta ? this.idVenta : '').then(res => {
      this.SNACK('VENTA_CANCELADA', '');
      this.dialogRef.close();
    }).catch(er => {
      this.SNACK('ERROR_GRAL', 'ACEPTAR');
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
