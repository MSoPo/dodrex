import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Empresa } from 'src/app/models/Empresa';
import { Usuario } from 'src/app/models/Usuario';
import { EMPRESA } from '../Constantes';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private afs: AngularFirestore) {
   }

  addUser(user: Partial<Usuario>): Promise<any> {
     return this.afs.collection('user').doc(user.id).set({
        id_empresa: user.id_empresa,
        id_rol: user.id_rol,
        activo: user.activo,
        correo: user.correo,
        nombre: user.nombre
      }, { merge: true });
   }

  addEmpresa(empresa: Partial<Empresa>): Promise<any>{
     return this.afs.collection('empresa').add(empresa);
  }

  updateEmpresa(empresa: Partial<Empresa>, idEmpresa: string | undefined): Promise<any>{
    empresa.operacion = 'update';
    return this.afs.collection('empresa').doc(idEmpresa).set(
      empresa, { merge: true });
  }

  getUser(idUser: string | undefined): Observable<any>{
    return this.afs.doc('user/' + idUser).get();
  }

  getEmpresa(idEmpresa: string | undefined): Observable<any> {
    return this.afs.doc('empresa/' + idEmpresa).get();
  }

  getUserEmpresa(idEmpresa: string | undefined): Promise<any> {
      return this.afs.collection('user').ref.where('id_empresa', '==', idEmpresa).get();
  }

  activate(user: Partial<Usuario>): Promise<void> {
    return this.afs.collection('user')
      .doc(user.id)
      .set({
        activo : user.activo,
        operacion : 'update'
      }, { merge: true });
  }

  updateRol(id_user: string, id_rol: string): Promise<void> {
    return this.afs.collection('user')
      .doc(id_user)
      .set({
        id_rol : id_rol,
        operacion : 'update'
      }, { merge: true });
  }

}
