import { Component, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  ACTIVE_BLOCK,
  DEFAULT_DURATION,
  EMPRESA,
  RFC,
  ROL_ADMINISTRADO,
  TELEFONO,
  USER_ACTIVE,
} from 'src/app/core/Constantes';
import { UsersService } from 'src/app/core/services/users.service';
import { Empresa } from 'src/app/models/Empresa';
import { AuthService } from 'src/app/core/services/auth.service';
import { Usuario } from 'src/app/models/Usuario';
import { TranslateService } from '@ngx-translate/core';
import { clearLogout } from 'src/app/core/Util';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.scss'],
})
export class NuevoUsuarioComponent implements OnInit {
  id_empresa = new FormControl('');
  form: FormGroup;
  bandera = new FormControl("2");
  userActual;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private usersService: UsersService,
    public translate: TranslateService
    
  ) {
    translate.setDefaultLang('es');
    this.userActual = USER_ACTIVE;
    this.form = this.formBuilder.group({
      email: [
        '',
        [Validators.email, Validators.maxLength(50), Validators.minLength(10)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      razonSocial: ['', [Validators.minLength(3), Validators.maxLength(100)]],
      rfc: ['', [Validators.pattern(RFC)]],
      direccion: ['', Validators.maxLength(250)],
      correo: ['', [Validators.email]],
      telefono: ['', [Validators.pattern(TELEFONO)]]
    });
  }

  ngOnInit(): void {}

  mayus(e: Event): void {
    this.form.get('rfc')?.setValue(this.form.get('rfc')?.value.toUpperCase());
  }

  saveUser(e: Event): void {
    e.preventDefault();
    const value = this.form.value;
    if (this.form.valid) {
      if (this.bandera.value == 1 && this.id_empresa.value) {
        ACTIVE_BLOCK.value = true;
        this.usersService.getEmpresa(this.id_empresa.value).subscribe(
          (res) => {
            const empresa = res.data();
            if (empresa) {
              this.authService
                .createUser(value.email, value.password)
                .then((response) => {
                  response.user.updateProfile({
                    displayName: value.nombre,
                  });
                  console.log(response.user.uid);
                  this.createUser(response.user.uid).then(
                    ()=>{
                      clearLogout();
                      this.authService.logout()
                      this.SNACK('REGISTRO_OK', '');
                      ACTIVE_BLOCK.value = false;
                      this.router.navigate(['/user']);
                    }
                  ).catch(
                   err=>console.log(err)
                  );
                })
                .catch((error) => {
                  console.log(error);
                  this.SNACK('ERROR_REGISTRO', 'ACEPTAR');
                  ACTIVE_BLOCK.value = false;
                });
            } else {
              this.SNACK('ERROR_EMPRESA', 'ACEPTAR');
              ACTIVE_BLOCK.value = false;
            }
          },
          (err) => {
            this.SNACK('ERROR_GRAL', 'ACEPTAR');
            ACTIVE_BLOCK.value = false;
          }
        );
      } else if (this.bandera.value == 2 && value.razonSocial) {
        ACTIVE_BLOCK.value = true;
        this.authService
          .createUser(value.email, value.password)
          .then((response) => {
            response.user.updateProfile({
              displayName: value.nombre,
            });
            console.log(response.user.uid);
            this.createEmpresa(response.user.uid).then((result) => {
              console.log(value.email);
              console.log(value.nombre);
              this.usersService.addUser({
                id: response.user.uid,
                id_rol: ROL_ADMINISTRADO.valor,
                id_empresa: result.id,
                activo: false,
                correo: value.email,
                nombre: value.nombre
              });
              this.SNACK('REGISTRO_OK', '');
              clearLogout();
              this.authService.logout();
              this.router.navigate(['/user']);
              ACTIVE_BLOCK.value = false;
            }).catch(er => {
              this.SNACK('ERROR_GRAL', 'ACEPTAR');
              ACTIVE_BLOCK.value = false;
            });
           
          })
          .catch((error) => {
            this.SNACK('ERROR_GRAL', 'ACEPTAR');
            ACTIVE_BLOCK.value = false;
          });
      } else {
        console.log(this.form.errors);
        this.SNACK('ERROR_VAL_EMPRESA', 'ACEPTAR');
      }
    } else {
      console.log(this.form.errors);
      this.SNACK('ERROR_DATOS', 'ACEPTAR');
    }
  }

  saveUserActual(e: Event): void{
    const value = this.form.value;
    if (this.bandera.value == 1 && this.id_empresa.value) {
      ACTIVE_BLOCK.value = true;
      this.usersService.getEmpresa(this.id_empresa.value).subscribe(
        (res) => {
          const empresa = res.data();
          if (empresa) {
                this.createUser(USER_ACTIVE.id ? USER_ACTIVE.id : '').then(
                  ()=>{
                    clearLogout();
                    this.authService.logout()
                    this.SNACK('REGISTRO_OK', '');
                    ACTIVE_BLOCK.value = false;
                    this.router.navigate(['/user']);
                  }
                ).catch(
                 err=>console.log(err)
                );
          } else {
            this.SNACK('ERROR_EMPRESA', 'ACEPTAR');
            ACTIVE_BLOCK.value = false;
          }
        },
        (err) => {
          this.SNACK('ERROR_DATOS', 'ACEPTAR');
          ACTIVE_BLOCK.value = false;
        }
      );
    } else if (this.bandera.value == 2 && value.razonSocial) {
      ACTIVE_BLOCK.value = true;

          console.log(USER_ACTIVE.id);
          this.createEmpresa(USER_ACTIVE.id ? USER_ACTIVE.id : '').then((result) => {
            console.log(result);
            this.usersService.addUser({
              id: USER_ACTIVE.id,
              id_rol: ROL_ADMINISTRADO.valor,
              id_empresa: result.id,
              activo: false,
              correo: USER_ACTIVE.correo,
              nombre: USER_ACTIVE.nombre
            });
            this.SNACK('REGISTRO_OK', '');
            clearLogout();
            this.authService.logout();
            this.router.navigate(['/user']);
            ACTIVE_BLOCK.value = false;
          }).catch(er => {
            this.SNACK('ERROR_GRAL', 'ACEPTAR');
            ACTIVE_BLOCK.value = false;
          });
    } else {
      this.SNACK('ERROR_VAL_EMPRESA', 'ACEPTAR');
    }

  }

  regresar(): void {
    this.router.navigate(['/user']);
  }

  createUser(id_user: string): Promise<void> {
    const value = this.form.value;
    const us: Partial<Usuario> = {
      activo: false,
      correo: value.email,
      id_rol: '',
      id_empresa: this.id_empresa.value,
      id: id_user,
      nombre: value.nombre
    };
    console.log(us);
    return this.usersService.addUser(us);
  }

  createEmpresa(idUsuario: string): Promise<any> {
    const form = this.form.value;
    const empresa: Partial<Empresa> = {
      direccion: form.direccion,
      id_usuario: idUsuario,
      razon_social: form.razonSocial,
      rfc: form.rfc,
      telefono: form.telefono,
      correo: form.correo,
      impresion: 1,
      head: ''
    };

    return this.usersService.addEmpresa(empresa);
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
