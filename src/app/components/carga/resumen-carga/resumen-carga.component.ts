import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  ACTIVE_BLOCK,
  DEFAULT_DURATION,
} from 'src/app/core/Constantes';
import { CargaService } from 'src/app/core/services/carga.service';
import { Carga } from 'src/app/models/Carga';

@Component({
  selector: 'app-resumen-carga',
  templateUrl: './resumen-carga.component.html',
  styleUrls: ['./resumen-carga.component.scss'],
})
export class ResumenCargaComponent {
  constructor(
    public dialogRef: MatDialogRef<ResumenCargaComponent>,
    @Inject(MAT_DIALOG_DATA) public carga: Carga,
    private snackBar: MatSnackBar,
    private cargaService: CargaService,
    private router: Router,
    public translate: TranslateService
  ) {
    translate.setDefaultLang('es');
  }

  onNoClick(): void {
    ACTIVE_BLOCK.value = true;
    this.cargaService
      .add(this.carga)
      .then((resp) => {
        ACTIVE_BLOCK.value = false;
        this.SNACK('CARGA_OK', '');
        this.dialogRef.close();
        this.router
          .navigateByUrl('/reload', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/carga']);
          });
      })
      .catch((err) => {
        ACTIVE_BLOCK.value = false;
        this.SNACK('ERROR_GRAL', 'ACEPTAR');
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
