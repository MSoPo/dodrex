import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ACTIVE_BLOCK, DEFAULT_DURATION, SUCURSALES, USER_ACTIVE } from 'src/app/core/Constantes';
import { SucursalService } from 'src/app/core/services/sucursal.service';
import { Sucursal } from 'src/app/models/Sucursal';
import { AgregarSucursalComponent } from '../agregar-sucursal/agregar-sucursal.component';

@Component({
  selector: 'app-unirseaempresa',
  templateUrl: './unirseaempresa.component.html',
  styleUrls: ['./unirseaempresa.component.scss']
})
export class UnirseaempresaComponent {

  displayedColumns: string[] = ['nombre', 'direccion', 'telefono'];
  dataSource = new MatTableDataSource<Partial<Sucursal>>(SUCURSALES);

  id_empresa = new FormControl();

  constructor(
    private snackBar: MatSnackBar,
    public translate: TranslateService,
    public dialog: MatDialog,
    public sucursalService: SucursalService
  ) {
    translate.setDefaultLang('es');
  }

  guardar(): void {
    console.log('Guardar');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AgregarSucursalComponent, {
      width: '40%',
      data: {},
    });

    dialogRef.afterClosed().subscribe((val: Sucursal) => {
      if(val){
        SUCURSALES.push(val);
        this.dataSource.data = SUCURSALES;
      }
      console.log('The dialog was closed');
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
