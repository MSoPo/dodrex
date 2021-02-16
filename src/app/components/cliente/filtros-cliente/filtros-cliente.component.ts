import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ACTIVE_BLOCK, CLIENTES, DEFAULT_DURATION } from 'src/app/core/Constantes';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { Cliente } from 'src/app/models/Cliente';
import { AgregarClienteComponent } from '../agregar-cliente/agregar-cliente.component';

@Component({
  selector: 'app-filtros-cliente',
  templateUrl: './filtros-cliente.component.html',
  styleUrls: ['./filtros-cliente.component.scss'],
})
export class FiltrosClienteComponent {
  @Output() getCliente = new EventEmitter<any>();
  clave = new FormControl();
  nombre = new FormControl();
  listas = new FormControl();

  constructor(
    public dialog: MatDialog,
    private clienteService: ClienteService,
    private snackBar: MatSnackBar,
    public translate: TranslateService
  ) {
    translate.setDefaultLang('es');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AgregarClienteComponent, {
      width: '40%',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  buscarCodigo(e: number): void {
    if (e === 13) {
      this.nombre.setValue('');
      this.listas.setValue(0);
      const cliente = CLIENTES.filter(c => c.clave.includes(this.clave.value));
      if (!cliente){
        this.SNACK('ERROR_NO_RESULT', 'ACEPTAR');
      }else {
        this.getCliente.emit(cliente);
      }
    }
  }

  buscarNombre(e: number): void {
    if (e === 13) {
      this.clave.setValue('');
      this.listas.setValue(0);
      const nombre = this.nombre.value ? this.nombre.value.toUpperCase() : '';
      const lstCleintes = CLIENTES.filter(c => c.nombre.includes(nombre));
      if (lstCleintes.length > 0) {
        this.getCliente.emit(lstCleintes);
      } else {
        this.SNACK('ERROR_NO_RESULT', 'ACEPTAR');
      }
    }
  }

  getFavs(): void {
    this.clave.setValue('');
    this.nombre.setValue('');
    const lstCleintes  = CLIENTES.filter(c => c.favorito);
    if (lstCleintes.length > 0) {
      this.getCliente.emit(lstCleintes);
    } else {
      this.SNACK('ERROR_NO_RESULT', 'ACEPTAR');
    }
  }

  getCancelado(): void {
    ACTIVE_BLOCK.value = true;
    this.clave.setValue('');
    this.nombre.setValue('');
    this.clienteService
      .getCancelar()
      .then((querySnapshot) => {
        ACTIVE_BLOCK.value = false;
        this.validarLista(querySnapshot);
      })
      .catch((err) => {
        ACTIVE_BLOCK.value = false;
        this.SNACK('ERROR_GRAL', 'ACEPTAR');
      });
  }

  validarLista(querySnapshot: any): void {
    const lst: Cliente[] = [];
    if (querySnapshot) {
      querySnapshot.forEach((element: { data: () => any }) => {
        lst.push(element.data());
      });
      if (lst.length > 0) {
        this.getCliente.emit(lst);
      } else {
        this.SNACK('ERROR_NO_RESULT', 'ACEPTAR');
      }
    } else {
      this.SNACK('ERROR_NO_RESULT', 'ACEPTAR');
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
