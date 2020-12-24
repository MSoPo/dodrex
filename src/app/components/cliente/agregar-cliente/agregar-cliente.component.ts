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
import {
  ACTIVE_BLOCK,
  DEFAULT_DURATION,
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Partial<Cliente>,
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AgregarClienteComponent>,
  ) {
    
    this.form = fb.group({
      clave: [
        data.clave ? data.clave : '',
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.minLength(1),
        ],
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
      correo: [data.correo ? data.correo : '', [Validators.email, Validators.maxLength(50), Validators.minLength(10)]],
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
      console.log(this.form.errors);
      this.snackBar.open(
        'Algún dato no es válido.',
        'Aceptar',
        DEFAULT_DURATION
      );
    }
  }

  formToUser(): void {
    const cliente: Partial<Cliente> = { ...this.form.value };
    if (this.data.operacion === 'update') {
      cliente.fecha_actualizacion = new Date();
    } else {
      cliente.fecha_creacion = new Date();
    }
    if(this.data.tipo_descuento !== TIPO_DESCUENTO.DESCUENTO) {
      this.data.descuento = 0;
    }
    console.log(cliente);
    ACTIVE_BLOCK.value = true;
    this.clienteService
      .add(cliente)
      .then((result) => {
        ACTIVE_BLOCK.value = false;
        console.log(result);
        if(this.data.operacion === 'update') {
          this.cargarPantallaLista(cliente);
          this.snackBar.open(
            `Cliente ${cliente.clave} actualizado.`,
            '',
            DEFAULT_DURATION
          );
        }else{
          this.snackBar.open(
            `Cliente ${cliente.clave} agregado.`,
            '',
            DEFAULT_DURATION
          );
        }
        this.dialogRef.close();
      })
      .catch((error) => {
        ACTIVE_BLOCK.value = false;
        console.log(error);
        this.snackBar.open(error.message, 'Aceptar', DEFAULT_DURATION);
      });
  }

  generateClave(): void {
    this.form.controls['clave'].setValue('DDR' + new Date().getTime());
  }

  cargarPantallaLista(prod: Partial<Cliente>){
    this.data.activo = prod.activo;
    this.data.clave = prod.clave;
    this.data.descuento = prod.descuento;
    this.data.direccion = prod.direccion;
    this.data.favorito = prod.favorito;
    this.data.nombre = prod.nombre;
    this.data.tipo_descuento = prod.tipo_descuento;
    this.data.usuario = prod.usuario;
  }
}
