import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import {
  ACTIVE_BLOCK,
  DEFAULT_DURATION,
  EMPRESA,
  RFC,
  TELEFONO,
  USER_ACTIVE,
} from 'src/app/core/Constantes';
import { UsersService } from 'src/app/core/services/users.service';
import { Empresa } from 'src/app/models/Empresa';
import { AngularFireStorage } from '@angular/fire/storage'

@Component({
  selector: 'app-cambiar-empresa',
  templateUrl: './cambiar-empresa.component.html',
  styleUrls: ['./cambiar-empresa.component.scss'],
})
export class CambiarEmpresaComponent implements OnInit {
  form: FormGroup;
  urlFile = '';

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private usersService: UsersService,
    public translate: TranslateService,
    private storage: AngularFireStorage
  ) {
    translate.setDefaultLang('es');
    this.form = this.formBuilder.group({
      id: [USER_ACTIVE.id_empresa],
      razonSocial: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      rfc: ['', [Validators.pattern(RFC)]],
      direccion: ['', Validators.maxLength(250)],
      correo: ['', [Validators.email]],
      telefono: ['', [Validators.pattern(TELEFONO)]],
      impresion: ['1'],
      head: ['', [Validators.maxLength(200)]]
    });
  }

  ngOnInit(): void {
    if (USER_ACTIVE.id_empresa) {
      this.usersService
        .getEmpresa(USER_ACTIVE.id_empresa)
        .subscribe((result) => {
          const empresa = result.data();
          if (empresa.razon_social) {
            this.urlFile = empresa.urlImage;
            this.form.setValue({
              id: USER_ACTIVE.id_empresa,
              razonSocial: empresa.razon_social,
              rfc: empresa.rfc,
              direccion: empresa.direccion,
              correo: empresa.correo,
              telefono: empresa.telefono,
              impresion: empresa.impresion + '',
              head: empresa.head ? empresa.head : ''
            });
          }
        });
    }
  }

  uploadChange(e: any){
    debugger;
    console.log(e);
    const file = e.target.files[0];
    const dir = `images/${EMPRESA.id}`;
    const filRef = this.storage.ref(dir); 
    const task = this.storage.upload(dir, file);

    ACTIVE_BLOCK.value = true;
    task.then(res => {
      debugger;
      res.ref.getDownloadURL().then(res => {
        this.urlFile = res;
        ACTIVE_BLOCK.value = false;
      }).catch(er => {
        this.SNACK('ERROR_GRAL', 'ACEPTAR');
        this.urlFile = '';
        ACTIVE_BLOCK.value = false;
      }
      );
      console.log(res);
    }).catch(err => {
      this.SNACK('ERROR_GRAL', 'ACEPTAR');
      ACTIVE_BLOCK.value = false;
    });
  }

  mayus(e: Event): void {
    this.form.get('rfc')?.setValue(this.form.get('rfc')?.value.toUpperCase());
  }

  createEmpresa(e: Event): void {
    const form = this.form.value;
    if (!this.form.valid) {
      this.SNACK('ERROR_DATOS', 'ACEPTAR');
      return;
    }
    const empresa: Partial<Empresa> = {
      direccion: form.direccion,
      id_usuario: USER_ACTIVE.id,
      razon_social: form.razonSocial,
      rfc: form.rfc,
      telefono: form.telefono,
      correo: form.correo,
      impresion: form.impresion,
      head: form.head,
      urlImage: this.urlFile
    };
    ACTIVE_BLOCK.value = true;
    if (!USER_ACTIVE.id) {
      empresa.id_usuario = USER_ACTIVE.id;
      this.usersService
        .addEmpresa(empresa)
        .then((res) => {
          this.SNACK('REGISTRO_OK', '');
          form.id.setValue('res.id');
          ACTIVE_BLOCK.value = false;
        })
        .catch((er) => {
          ACTIVE_BLOCK.value = false;
          this.SNACK('ERROR_GRAL', 'ACEPTAR');
        });
    } else {
      this.usersService
        .updateEmpresa(empresa, USER_ACTIVE.id_empresa)
        .then((res) => {
          ACTIVE_BLOCK.value = false;
          EMPRESA.impresion = empresa.impresion;
          this.SNACK('ACTUALIZACION_OK', '');
        })
        .catch((er) => {
          ACTIVE_BLOCK.value = false;
          this.SNACK('ERROR_GRAL', 'ACEPTAR');
        });
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
