import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import {
  CLIENTES,
  CLIENTE_PENDIENTE,
  DEFAULT_DURATION,
  ROL_ADMINISTRADO,
  SOLO_NUMERO_DECIMALES,
  SOLO_NUMERO_ENTERO,
  TELEFONO,
  TIPO_DESCUENTO,
  USER_ACTIVE,
} from 'src/app/core/Constantes';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { Cliente } from 'src/app/models/Cliente';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state(
        'open',
        style({
          opacity: 1,
        })
      ),
      state(
        'closed',
        style({
          height: '0px',
          opacity: 0,
        })
      ),
      transition('open => closed', [animate('0.5s')]),
      transition('closed => open', [animate('0.5s')]),
    ]),
  ],
})
export class AgregarClienteComponent implements OnInit {
  form: FormGroup;
  rol = USER_ACTIVE.id_rol;
  rolAdmin = ROL_ADMINISTRADO.valor;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Partial<Cliente>,
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AgregarClienteComponent>,
    public translate: TranslateService
  ) {
    translate.setDefaultLang('es');
    this.form = fb.group({
      clave: [
        data.clave ? data.clave : new Date().getTime()
      ],
      nombre: [
        data.nombre ? data.nombre : '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(3),
        ],
      ],
      direccion: [data.direccion ? data.direccion : '', [Validators.maxLength(250), Validators.minLength(3)]],
      telefono: [data.telefono ? data.telefono : '', [Validators.pattern(TELEFONO)]],
      descuento: [
        data.descuento ? data.descuento : '',
        [
          Validators.max(100),
          Validators.min(0),
          Validators.pattern(SOLO_NUMERO_DECIMALES),
        ],
      ],
      tipo_descuento: [
        data.tipo_descuento ? data.tipo_descuento : TIPO_DESCUENTO.SIN_DESCUENTO.toString(),
        [Validators.required, Validators.pattern(SOLO_NUMERO_ENTERO)],
      ],
      favorito: [data.favorito ? data.favorito : false],
      operacion: [data.operacion ? data.operacion : 'creacion'],
      fecha: new Date(),
      usuario: USER_ACTIVE.id,
      activo: data.activo ? data.activo : true,
      
    });
  }

  ngOnInit(): void {}

  isFavo(): void {
    this.form.value.favorito = !this.form.value.favorito;
  }

  add(e: Event): void {
    e.preventDefault();
    if (this.form.valid) {
      this.form.value.nombre = this.form.value.nombre.toUpperCase();
      this.formToUser();
    }else {
      this.SNACK('ERROR_DATOS', 'ACEPTAR')
    }
  }

  formToUser(): void {
    const cliente = { ...this.form.value };
    if (this.data.operacion === 'update') {
      cliente.fecha_actualizacion = new Date();
    } else {
      cliente.fecha_creacion = new Date();
    }
    if(this.data.tipo_descuento !== TIPO_DESCUENTO.DESCUENTO) {
      this.data.descuento = 0;
    }
    if(this.data.operacion === 'update') {
      Object.assign(this.data, cliente)
      this.SNACK('ACTUALIZACION_OK', '');
    }else{
      cliente.clave = cliente.clave.toString();
      CLIENTES.push(cliente);
      this.SNACK('REGISTRO_OK', '');
    }
    this.llamadaCliente(cliente);
    this.dialogRef.close(cliente);
  }

  llamadaCliente(cliente: Cliente): void{
    this.clienteService
      .add(cliente)
      .catch((error) => {
        cliente.error = error;
        cliente.error.mensaje = error.message;
        CLIENTE_PENDIENTE.push(cliente);
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
