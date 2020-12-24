import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DEFAULT_DURATION, ROL_ADMINISTRADO, USER_ACTIVE } from '../core/Constantes';
import { UsersService } from '../core/services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private usersService: UsersService, private router: Router, private snackBar: MatSnackBar ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    console.log(USER_ACTIVE);
    
    return this.usersService.getUser(USER_ACTIVE.id).pipe(tap(user => console.log(user.data())),
    map(user => {
      console.log(user.data());
      if(user.data() && user.data().id_rol){
        USER_ACTIVE.id_rol = user.data().id_rol;
        if(ROL_ADMINISTRADO.valor = user.data().id_rol){
          return true;
        }
      }else{
        this.router.navigate(['/user/user']);
        this.snackBar.open('Ingresa los datos de tú empresa para poder comenzar.', 'Aceptar', DEFAULT_DURATION);
      }
        return false;
    }));
  }
  



}
