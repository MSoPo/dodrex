import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import { ACTIVE_BLOCK, EMPRESA, USER_ACTIVE } from '../Constantes';
import { clearLogout } from '../Util';

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
