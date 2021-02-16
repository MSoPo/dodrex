import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ACTIVE_BLOCK, CLIENTES, DEFAULT_DURATION } from 'src/app/core/Constantes';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { Cliente } from 'src/app/models/Cliente';
import { AgregarClienteComponent } from '../agregar-cliente/agregar-cliente.component';
import { EliminarClienteComponent } from '../eliminar-cliente/eliminar-cliente.component';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.scss'],
})
export class ListaClienteComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'editar',
    'clave',
    'nombre',
    'descuento',
    'correo',
    'direccion',
    'acciones',
  ];
  dataSource = new MatTableDataSource<Cliente>(CLIENTES.slice(0,10));
  sortData!: Cliente[];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    private clienteService: ClienteService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public translate: TranslateService
  ) {
    translate.setDefaultLang('es');
  }

  ngAfterViewInit() {
    console.log(this.sortData);
    if(this.paginator){
      this.dataSource.paginator = this.paginator;
    }
  }

  delete(element: Cliente): void {
    this.dialog.open(EliminarClienteComponent, {
      data: element,
    });
  }

  edit(element: Cliente): void {
    element.operacion = 'update';
    this.dialog.open(AgregarClienteComponent, {
      data: element,
    });
  }

  handleClienteAddToList(cliente: Cliente[]): void {
    console.log('cliente -> ', cliente);
    this.dataSource.data = cliente;
    if(this.paginator){
      this.dataSource.paginator = this.paginator;
    }
  }

  fav(el: Cliente): void {
    el.favorito = !el.favorito;
    ACTIVE_BLOCK.value = true;
    this.clienteService
      .fav(el)
      .then((result) => (ACTIVE_BLOCK.value = false))
      .catch((err) => {
        this.SNACK('ERROR_GRAL', 'ACEPTAR');
        ACTIVE_BLOCK.value = false;
      });
  }

  sortDataMetod(sort: Sort) {
    const data = this.dataSource.data;
    if (!sort.active || sort.direction == '') {
      this.sortData = data;
      return;
    }

    this.sortData = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'nombre':
          return compare(a.nombre, b.nombre, isAsc);
        case 'descuento':
          return compare(+a.tipo_descuento, +b.tipo_descuento, isAsc);
        case 'clave':
          return compare(a.clave, b.clave, isAsc);
        default:
          return 0;
      }
    });
    this.dataSource.data = this.sortData;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
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

function compare(a: any, b: any, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
