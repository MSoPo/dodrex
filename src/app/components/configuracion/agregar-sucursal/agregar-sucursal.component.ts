import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_DURATION, SUCURSALES } from 'src/app/core/Constantes';
import { SucursalService } from 'src/app/core/services/sucursal.service';
import { Sucursal } from 'src/app/models/Sucursal';

@Component({
  selector: 'app-agregar-sucursal',
  templateUrl: './agregar-sucursal.component.html',
  styleUrls: ['./agregar-sucursal.component.scss']
})
export class AgregarSucursalComponent {
  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Partial<Sucursal>,
  private fb: FormBuilder,
  private snackBar: MatSnackBar,
  public dialogRef: MatDialogRef<AgregarSucursalComponent>,
  public sucursalService: SucursalService,
  public translate: TranslateService)  
  {
    translate.setDefaultLang('es');
    this.form = fb.group({
      nombre: [
        data.nombre ? data.nombre : '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(3),
        ],
      ],
      direccion: [data.direccion ? data.direccion : '', [Validators.maxLength(250), Validators.minLength(3)]],
      telefono: [data.telefono ? data.telefono : ''],
      
    });
   }

  add(e: Event): void {
    const sucursal: Sucursal = { ...this.form.value };
    sucursal.numero = SUCURSALES.length + 1;
    this.sucursalService.add(sucursal).then((val: any) => {
      console.log(val.id);
      sucursal.clave = val.id;
      this.dialogRef.close(sucursal);
    }).catch(er => {
      this.SNACK('ACEPTAR', 'ERROR_GRAL');
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
