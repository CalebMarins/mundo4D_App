import{ Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable() export class AuthProvider{

    constructor(
        private afAuth: AngularFireAuth
    ){}

    //Cadastro de usuário
    cadastro = (data) => this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password);

    //Login de usuário existente
    login= (data) => this.afAuth.auth.signInWithEmailAndPassword(data.email, data.password);

    //Esqueci a senha
    resetPass(email: string) {
        return this.afAuth.auth.sendPasswordResetEmail(email);
    }

    getAuth(){
        return this.afAuth.auth;
    }
}