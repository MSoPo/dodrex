import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { USER_ACTIVE, DEFAULT_DURATION, EMPRESA } from 'src/app/core/Constantes';
import { AuthService } from 'src/app/core/services/auth.service';
import { clearLogout } from 'src/app/core/Util';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  username = USER_ACTIVE.nombre;
  urlFile = EMPRESA.urlImage;
  constructor(
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('es');
  }

  ngOnInit(): void {}

  logout(): void {
    clearLogout();
    this.auth
      .logout()
      .then(() => {
        this.SNACK('LOGOUT', 'ACEPTAR');
        this.router.navigate(['/user']);
      })
      .catch((err) => {
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
