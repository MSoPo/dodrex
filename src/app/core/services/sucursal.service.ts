import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference } from '@angular/fire/firestore';
import { Sucursal } from 'src/app/models/Sucursal';
import { EMPRESA } from '../Constantes';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  constructor(private afs: AngularFirestore) {}

  add(sucursal: Sucursal): Promise<any> {
    return this.afs.doc('empresa/' + EMPRESA.id).collection('sucursales')
      .add(sucursal);
  }

  get(sucursal: Sucursal): Promise<any>{
    return this.pathSucursal().doc(sucursal.clave).get();
  }

  getAll(){
    return this.pathSucursal().get();
  }

  pathSucursal(): CollectionReference{
    return this.afs.doc('empresa/' + EMPRESA.id).collection('sucursales').ref;
  }
}
