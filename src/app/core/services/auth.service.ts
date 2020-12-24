import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import { ACTIVE_BLOCK, EMPRESA, USER_ACTIVE } from '../Constantes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afa: AngularFireAuth) { }

  createUser(email: string, password: string): Promise<any> {
    return this.afa.createUserWithEmailAndPassword(email, password);
  }

  loginGmail(): Promise<any>{
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afa.signInWithPopup(provider);
  }

  login(email: string, password: string): Promise<any>{
    return this.afa.signInWithEmailAndPassword(email, password);
  }

  logout(): Promise<any>{
    clearLogout();
    return this.afa.signOut();
  }

  hasUser(): Observable<any>{
    return this.afa.authState;
  }

  restorePassword(email: string): Promise<void>{
    return this.afa.sendPasswordResetEmail(email, {url: 'http://localhost:4200/user/login'});
  }
}

function clearLogout(){
  delete USER_ACTIVE.activo;
  delete USER_ACTIVE.correo;
  delete USER_ACTIVE.id;
  delete USER_ACTIVE.id_empresa;
  delete USER_ACTIVE.id_rol;
  delete USER_ACTIVE.nombre;
  delete EMPRESA.correo;
  delete EMPRESA.direccion;
  delete EMPRESA.id;
  delete EMPRESA.id_usuario;
  delete EMPRESA.operacion;
  delete EMPRESA.razon_social;
  delete EMPRESA.rfc;
  delete EMPRESA.telefono;
}
