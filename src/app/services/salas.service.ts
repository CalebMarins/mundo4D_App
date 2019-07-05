import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Salas } from '../interfaces/salas';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SalasService {
  private salasCollection: AngularFirestoreCollection <Salas>;
  constructor( private afs : AngularFirestore) { 
    this.salasCollection =  this.afs.collection<Salas>('Salas');
  }

  //Listando Salas do professor
  getSalas(){
    return this.salasCollection.snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return  { id, ...data};
        })
      })
    )
  }
  // ADICIONAR SALA
  addSala(salas : Salas){
    return this.salasCollection.add(salas);
  }

  // VISUALIZAR SALA
  getSala(id : string){
    return this.salasCollection.doc<Salas>(id).valueChanges();

  }

  // ATUALIZAR SALA
  updateSala(id:string, salas: Salas){
    return this.salasCollection.doc<Salas>(id).update(salas);
  }

  // DELETAR SALA
  deleteSala(id : string){
    return this.salasCollection.doc(id).delete();
  }
}
