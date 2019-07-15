import { Aluno } from './../interfaces/aluno';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  private alunosCollection : AngularFirestoreCollection<Aluno>;

  constructor(private afAuth : AngularFirestore) {
    this.alunosCollection = this.afAuth.collection<Aluno>('Alunos');
   }

   //Listar os launos na coleção
   getAlunos(){
     return this.alunosCollection.snapshotChanges().pipe(
       map(actions=>{
         return actions.map(a=>{
           const data = a.payload.doc.data();
           const id = a.payload.doc.id;

           return{id, ...data};
         });
       })
     )
   }

   //Adicionar alunos na coleção
   addAluno(aluno : Aluno){
     return this.alunosCollection.add(aluno);
   }

   //Pegar o aluno específico
   getAluno(id:string){
     return this.alunosCollection.doc<Aluno>(id).valueChanges();
   }

   //Pegar o aluno x para uma possível alteração
   updateALuno(id:string, aluno : Aluno){

   }

   //Deletar aluno
   deleteAluno(id : string){

   }


    
}
