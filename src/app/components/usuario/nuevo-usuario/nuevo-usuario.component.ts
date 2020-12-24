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
  RFC,
  ROL_ADMINISTRADO,
  TELEFONO,
  USER_ACTIVE,
} from 'src/app/core/Constantes';
import { UsersService } from 'src/app/core/services/users.service';
import { Empresa } from 'src/app/models/Empresa';
import { AuthService } from 'src/app/core/services/auth.service';
import { Usuario } from 'src/app/models/Usuario';

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
    private usersService: UsersService
  ) {
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
    console.log(this.form.value);
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

                      this.authService.logout()
                    }
                  ).catch(
                   err=>console.log(err)
                  );
                  this.snackBar.open(
                    'Usuario registrado. Ahora inicia sesión.',
                    undefined,
                    DEFAULT_DURATION
                  );
                  ACTIVE_BLOCK.value = false;
                  this.router.navigate(['/user']);
                })
                .catch((error) => {
                  this.snackBar.open(
                    error.message,
                    'Aceptar',
                    DEFAULT_DURATION
                  );
                  ACTIVE_BLOCK.value = false;
                });
            } else {
              this.snackBar.open(
                'No existe la empresa, verifíca la clave.',
                'Aceptar',
                DEFAULT_DURATION
              );
              ACTIVE_BLOCK.value = false;
            }
          },
          (err) => {
            this.snackBar.open(err.message, 'Aceptar', DEFAULT_DURATION);
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
              console.log(result);
              this.usersService.addUser({
                id: response.user.uid,
                id_rol: ROL_ADMINISTRADO.valor,
                id_empresa: result.id,
                activo: false,
                correo: value.correo,
                nombre: value.nombre
              });
              this.snackBar.open(
                'Usuario registrado. Ahora inicia sesión.',
                undefined,
                DEFAULT_DURATION
              );
              this.authService.logout();
              this.router.navigate(['/user']);
              ACTIVE_BLOCK.value = false;
            }).catch(er => {
              this.snackBar.open(
                'Ocurrio un error contacta con el administrador.',
                undefined,
                DEFAULT_DURATION
              );
              ACTIVE_BLOCK.value = false;
            });
           
          })
          .catch((error) => {
            this.snackBar.open(error.message, 'Aceptar', DEFAULT_DURATION);
            ACTIVE_BLOCK.value = false;
          });
      } else {
        console.log(this.form.errors);
        this.snackBar.open(
          'La Razon Social o Identificador de la empresa es obligatorio.',
          'Aceptar',
          DEFAULT_DURATION
        );
      }
    } else {
      console.log(this.form.errors);
      this.snackBar.open(
        'Algún dato no es válido.',
        'Aceptar',
        DEFAULT_DURATION
      );
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
                console.log(USER_ACTIVE.id);
                this.createUser(USER_ACTIVE.id ? USER_ACTIVE.id : '').then(
                  ()=>{

                    this.authService.logout()
                  }
                ).catch(
                 err=>console.log(err)
                );
                this.snackBar.open(
                  'Usuario registrado. Ahora inicia sesión.',
                  undefined,
                  DEFAULT_DURATION
                );
                ACTIVE_BLOCK.value = false;
                this.router.navigate(['/user']);
          } else {
            this.snackBar.open(
              'No existe la empresa, verifíca la clave.',
              'Aceptar',
              DEFAULT_DURATION
            );
            ACTIVE_BLOCK.value = false;
          }
        },
        (err) => {
          this.snackBar.open(err.message, 'Aceptar', DEFAULT_DURATION);
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
              correo: USER_ACTIVE.nombre,
              nombre: USER_ACTIVE.correo
            });
            this.snackBar.open(
              'Usuario registrado. Ahora inicia sesión.',
              undefined,
              DEFAULT_DURATION
            );
            this.authService.logout();
            this.router.navigate(['/user']);
            ACTIVE_BLOCK.value = false;
          }).catch(er => {
            this.snackBar.open(
              'Ocurrio un error contacta con el administrador.',
              undefined,
              DEFAULT_DURATION
            );
            ACTIVE_BLOCK.value = false;
          });
    } else {
      console.log(this.form.errors);
      this.snackBar.open(
        'La Razon Social o Identificador de la empresa es obligatorio.',
        'Aceptar',
        DEFAULT_DURATION
      );
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
      correo: form.correo
    };

    return this.usersService.addEmpresa(empresa);
  }
}
