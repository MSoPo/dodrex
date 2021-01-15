import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import {
  ACTIVE_BLOCK,
  DEFAULT_DURATION,
  USER_ACTIVE,
  FORMA_PAGO
} from 'src/app/core/Constantes';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { UsersService } from 'src/app/core/services/users.service';
import { VentaService } from 'src/app/core/services/venta.service';
import { Cliente } from 'src/app/models/Cliente';
import { Usuario } from 'src/app/models/Usuario';
import { Venta } from 'src/app/models/Venta';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss'],
})
export class FiltrosComponent {
  @Output() getVentas = new EventEmitter<any>();

  cliente = new FormControl();
  usuario = new FormControl();
  especial = new FormControl();

  range = new FormGroup({
    start: new FormControl(new Date()),
    end: new FormControl(new Date()),
  });

  lstCliente: Cliente[] = [];

  lstUsuario: Usuario[] = [];

  constructor(
    private clienteService: ClienteService,
    private userService: UsersService,
    private snackBar: MatSnackBar,
    private ventaService: VentaService,
    public translate: TranslateService
  ) {
    translate.setDefaultLang('es');
    this.clienteService.getAll().then((respu) => {
      respu.forEach((element: { data: () => any }) => {
        this.lstCliente.push(element.data());
      });
    });

    this.userService.getUserEmpresa(USER_ACTIVE.id_empresa).then((respu) => {
      respu.forEach((element: { data: () => any; id: string }) => {
        this.lstUsuario.push({
          ...element.data(),
          id: element.id,
        });
      });
    });

    this.ventaService.getFecha(new Date(), new Date(), '', '').then(r => {
      const lstventas: Venta[] = [];
      r.forEach((element: { data: () => any; id: string }) => {
        lstventas.push({ ...element.data(), id: element.id });
      });
      this.getVentas.emit(lstventas);
    });
  }

  buscar(): void {
    if (this.especial.value == 1) {
      this.buscarCanceladas();
      return;
    }

    if(this.especial.value == 2){
      this.buscarFormaPago(FORMA_PAGO.EFECTIVO);
      return;
    }

    if(this.especial.value == 3){
      this.buscarFormaPago(FORMA_PAGO.TRANSFERENCIA);
      return;
    }

    if(this.especial.value == 4){
      this.buscarFormaPago(FORMA_PAGO.ABONOS);
      return;
    }

    if (!this.range.valid) {
      this.SNACK('ERROR_FECHAS', 'ACEPTAR');
      return;
    }
    ACTIVE_BLOCK.value = true;
    this.ventaService
      .getFecha(
        this.range.value.start,
        this.range.value.end,
        this.cliente.value,
        this.usuario.value
      )
      .then((r) => {
        const lstventas: Venta[] = [];
        r.forEach((element: { data: () => any; id: string }) => {
          lstventas.push({ ...element.data(), id: element.id });
        });
        this.getVentas.emit(lstventas);
        if (lstventas.length < 1) {
          this.SNACK('ERROR_NO_RESULT', 'ACEPTAR');
        }
        ACTIVE_BLOCK.value = false;
      })
      .catch((err) => {
        this.SNACK('ERROR_GRAL', 'ACEPTAR');
        ACTIVE_BLOCK.value = false;
      });
  }

  buscarCanceladas(): void {
    ACTIVE_BLOCK.value = true;
    this.ventaService
      .getAllCancelada()
      .then((res) => {
        const lstventas: Venta[] = [];
        res.forEach((element: { data: () => any; id: string }) => {
          lstventas.push({ ...element.data(), id: element.id });
        });
        this.getVentas.emit(lstventas);
        if (lstventas.length < 1) {
          this.SNACK('ERROR_NO_RESULT', 'ACEPTAR');
        }
        ACTIVE_BLOCK.value = false;
      })
      .catch((er) => {
        this.SNACK('ERROR_GRAL', 'ACEPTAR');
        ACTIVE_BLOCK.value = false;
      });
  }

  buscarFormaPago(formaPago: number): void {
    ACTIVE_BLOCK.value = true;
    this.ventaService
      .getFecha(
        this.range.value.start,
        this.range.value.end,
        '',
        '', 
        formaPago)
      .then((res) => {
        const lstventas: Venta[] = [];
        res.forEach((element: { data: () => any; id: string }) => {
          lstventas.push({ ...element.data(), id: element.id });
        });
        this.getVentas.emit(lstventas);
        if (lstventas.length < 1) {
          this.SNACK('ERROR_NO_RESULT', 'ACEPTAR');
        }
        ACTIVE_BLOCK.value = false;
      })
      .catch((er) => {
        this.SNACK('ERROR_GRAL', 'ACEPTAR');
        ACTIVE_BLOCK.value = false;
      });
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
