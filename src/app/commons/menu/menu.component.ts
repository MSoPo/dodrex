import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { USER_ACTIVE, DEFAULT_DURATION } from 'src/app/core/Constantes';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  username = USER_ACTIVE.nombre;
  constructor(private auth: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.auth.logout().then(() => {
      this.snackBar.open('Vuelve pronto.', undefined, DEFAULT_DURATION);
      this.router.navigate(['/user']);
    }).catch(err => {
      this.snackBar.open(err.message, 'Aceptar', DEFAULT_DURATION);
    });
  }

}
