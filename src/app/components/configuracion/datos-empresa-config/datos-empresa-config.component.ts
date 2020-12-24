import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { USER_ACTIVE } from 'src/app/core/Constantes';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-datos-empresa-config',
  templateUrl: './datos-empresa-config.component.html',
  styleUrls: ['./datos-empresa-config.component.scss']
})
export class DatosEmpresaConfigComponent implements OnInit {

  razon_social = new FormControl();
  id_empresa = new FormControl();

  constructor(private usersService: UsersService) {

   }

  ngOnInit(): void {
    if(USER_ACTIVE.id_empresa){
      this.usersService.getEmpresa(USER_ACTIVE.id_empresa).subscribe(result => {
        const empresa = result.data()
        if(empresa.razon_social){
          this.razon_social.setValue(empresa.razon_social);
          this.id_empresa.setValue(USER_ACTIVE.id_empresa);
        }
      });
    }
  }

}
