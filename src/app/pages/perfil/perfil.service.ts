// import * as firebase from 'firebase/app';
// import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
// import {Observable} from 'rxjs/Observable';
// import 'rxjs/add/operator/switchMap'
// import { Router } from '@angular/router';
// import { AngularFireAuth } from 'angularfire2/auth';
// import{  Injectable } from '@angular/core';

// interface User {
//     uid: string;
//     email: string;
//     nome: string;
//     picture?: string
// }

// @Injectable() export class PerfilService{

//     user: Observable<User>;

//     constructor(
//         private afAuth: AngularFireAuth,
//         private afs : AngularFirestore,
//         private router : Router
//     ){
//         this.user= this.afAuth.authState.switchMap(user =>{
//             if(user){
//                 return this.afs.doc<User>(`Users/${user.uid}`).valueChanges()
//             }
//             else{
//                 return Observable.if(null)
//             }
//         })
//     }

//     private dados(user){
//         const userDados: AngularFirestoreDocument<User> = this.afs.doc(`Users/${user.uid}`);

//         const data : User={
//             uid: user.uid,
//             email : user.email,
//             nome : user.nome,
//             picture : user.picture
//         }

//         return userDados.set(data)
//     }
// }
