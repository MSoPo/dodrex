import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ACTIVE_BLOCK, DEFAULT_DURATION, EMPRESA, RFC, TELEFONO, USER_ACTIVE } from 'src/app/core/Constantes';
import { UsersService } from 'src/app/core/services/users.service';
import { Empresa } from 'src/app/models/Empresa';

@Component({
  selector: 'app-cambiar-empresa',
  templateUrl: './cambiar-empresa.component.html',
  styleUrls: ['./cambiar-empresa.component.scss']
})
export class CambiarEmpresaComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private usersService: UsersService) {
    
    this.form = this.formBuilder.group({
      id: [USER_ACTIVE.id_empresa],
      razonSocial: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]],
      rfc: ['', [
        Validators.pattern(RFC)
      ]],
      direccion: ['', Validators.maxLength(250)],
      correo: ['', [Validators.email]],
      telefono: ['', [Validators.pattern(TELEFONO)]]

    });
   }

  ngOnInit(): void {
    if(USER_ACTIVE.id_empresa){
      this.usersService.getEmpresa(USER_ACTIVE.id_empresa).subscribe(result => {
        const empresa = result.data()
        if(empresa.razon_social){
          this.form.setValue({
            id: USER_ACTIVE.id_empresa,
            razonSocial: empresa.razon_social,
            rfc: empresa.rfc,
            direccion: empresa.direccion,
            correo: empresa.correo,
            telefono: empresa.telefono
          });
        }
      });
    }
  }

   mayus(e: Event): void {
    this.form.get('rfc')?.setValue(this.form.get('rfc')?.value.toUpperCase());
  }

  createEmpresa(e: Event): void{
    const form = this.form.value;
    if(!this.form.valid){
      this.snackBar.open('Algúnos datos no son válidos.', 'Aceptar', DEFAULT_DURATION)
      return;
    }
    const empresa: Partial<Empresa> = {
      direccion: form.direccion,
      id_usuario: USER_ACTIVE.id,
      razon_social: form.razonSocial,
      rfc: form.rfc,
      telefono: form.telefono,
      correo: form.correo
    };
    ACTIVE_BLOCK.value = true;
    if(!USER_ACTIVE.id){
      empresa.id_usuario = USER_ACTIVE.id;
      this.usersService.addEmpresa(empresa).then(res => {
        this.snackBar.open(`Se registro tu empresa con el identificador ${res.id}`,'',DEFAULT_DURATION);
        form.id.setValue('res.id');
        ACTIVE_BLOCK.value = false;
      }).catch(er => {
        ACTIVE_BLOCK.value = false;
        this.snackBar.open(er, 'Aceptar', DEFAULT_DURATION)
      });
    }else{
      this.usersService.updateEmpresa(empresa, USER_ACTIVE.id_empresa).then(res => {
        ACTIVE_BLOCK.value = false;
        this.snackBar.open(`Datos de la emrpesa actualizados`,'',DEFAULT_DURATION);
      }).catch(er => {
        ACTIVE_BLOCK.value = false;
        this.snackBar.open(er, 'Aceptar', DEFAULT_DURATION)
      });
    }
  }

}
