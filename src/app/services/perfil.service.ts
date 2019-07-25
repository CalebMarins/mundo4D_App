import { Perfil } from './../interfaces/perfil';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators'
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  perfilLogado

  private perfilCollection: AngularFirestoreCollection <Perfil>;
  constructor(
    private afs : AngularFirestore,
    private afAuth : AngularFireAuth
    ) {
    const perfil =  afs.doc(`Users/${this.getPerfil()}`);
    this.perfilLogado = perfil.valueChanges();
   }

   getPerfil(){
    const user =  this.afAuth.auth.currentUser;
    return user.uid;

  }
}
