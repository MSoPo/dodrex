import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ACTIVE_BLOCK, DEFAULT_DURATION } from 'src/app/core/Constantes';
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
    private snackBar: MatSnackBar
  ) {}

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
      ACTIVE_BLOCK.value = true;
      this.clienteService
        .getClaveAll(this.clave.value)
        .then((querySnapshot) => {
          ACTIVE_BLOCK.value = false;
          switch (querySnapshot.size) {
            case 0:
              this.snackBar.open(
                `No existe la clave ${this.clave.value}`,
                undefined,
                DEFAULT_DURATION
              );
              return;
            case 1:
              this.getCliente.emit([querySnapshot.docs[0].data()]);
              this.clave.setValue('');
              console.log(querySnapshot.docs[0].data());
              return;
            default:
              this.snackBar.open(
                `El cliemte ${this.clave.value} tiene algún problema.`,
                undefined,
                DEFAULT_DURATION
              );
              return;
          }
        })
        .catch((err) => {
          ACTIVE_BLOCK.value = false;
          this.snackBar.open(err.message, 'Aceptar', DEFAULT_DURATION);
        });
    }
  }

  buscarNombre(e: number): void {
    if (e === 13) {
      this.clave.setValue('');
      this.listas.setValue(0);
      ACTIVE_BLOCK.value = true;
      this.clienteService
        .getNombre(this.nombre.value)
        .then((querySnapshot) => {
          ACTIVE_BLOCK.value = false;
          this.validarLista(querySnapshot);
        })
        .catch((err) => {
          ACTIVE_BLOCK.value = false;
          this.snackBar.open(err.message, 'Aceptar', DEFAULT_DURATION);
        });
    }
  }

  getFavs(): void {
    ACTIVE_BLOCK.value = true;
    this.clave.setValue('');
    this.nombre.setValue('');
    this.clienteService
      .getFavorite()
      .then((querySnapshot) => {
        ACTIVE_BLOCK.value = false;
        this.validarLista(querySnapshot);
      })
      .catch((err) => {
        ACTIVE_BLOCK.value = false;
        this.snackBar.open(err.message, undefined, DEFAULT_DURATION);
      });
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
        this.snackBar.open(err.message, 'Aceptar', DEFAULT_DURATION);
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
        this.snackBar.open(
          'No se encontraron clientes.',
          'Aceptar',
          DEFAULT_DURATION
        );
      }
    } else {
      this.snackBar.open(
        'No se encontraron clientes.',
        'Aceptar',
        DEFAULT_DURATION
      );
    }
  }
}
