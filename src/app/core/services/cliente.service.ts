import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference } from '@angular/fire/firestore';
import { Cliente } from 'src/app/models/Cliente';
import { EMPRESA } from '../Constantes';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(private afs: AngularFirestore) {}

  add(cliente: Partial<Cliente>): Promise<void> {
    return this.afs.doc('empresa/' + EMPRESA.id).collection('clientes')
      .doc(cliente.clave).set(cliente, { merge: true });
  }

  activate(cliente: Partial<Cliente>): Promise<void> {
    return this.pathCliente()
      .doc(cliente.clave)
      .set({
        activo : cliente.activo,
        operacion : 'update'
      }, { merge: true });
  }

  fav(cliente: Partial<Cliente>): Promise<void> {
    return this.pathCliente().doc(cliente.clave)
      .set({
        favorito : cliente.favorito,
        operacion : 'update'
      }, { merge: true });
  }

  getFavorite(): Promise<any>{
    return this.pathCliente().where('favorito', '==', true).where('activo', '==', true).get();
  }

  getCancelar(): Promise<any>{
    return this.pathCliente().where('activo', '==', false).get();
  }

  getClave(clave: string): Promise<any> {
    return this.pathCliente().where('clave', '==', clave).where('activo', '==', true).get();
  }

  getClaveAll(clave: string): Promise<any> {
    return this.pathCliente().where('clave', '==', clave).get();
  }

  getNombre(nombre: string): Promise<any>{
    const name = nombre ? nombre.toUpperCase() : ''; 
    return this.pathCliente()
      .where('nombre', '>=', name)
      .where('nombre', '<', name + '\uf8ff')
      .where('activo', '==', true)
      .get();
  }
  
  getAll(): Promise<any>{
    return this.pathCliente().get();
  }

  pathCliente(): CollectionReference{
    return this.afs.doc('empresa/' + EMPRESA.id).collection('clientes').ref;
  }

}
