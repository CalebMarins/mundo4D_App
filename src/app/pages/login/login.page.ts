import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController, AlertController } from '@ionic/angular';
import {AuthProvider} from '../../../providers/auth';
import {FirebaseProvider} from '../../../providers/data';
import { Router } from '@angular/router';
import {Storage} from '@ionic/storage'




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides) slides : IonSlides;

  //Divisão de telas
  splash= true;
  login= true;
  esqueceu= false;

  constructor(
    private router: Router,
    private authProvider: AuthProvider,
    private firebaseProvider: FirebaseProvider,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private storage: Storage,
  ) { }

  
  ngOnInit() {
    //Definindo tempo de splash screen
    setTimeout(()=>{
      this.splash = false;
    }, 4000);
  } 
  // Definindo evento de clique no segmento
  segmentChanged(event : any){
    if (event.detail.value ==="login"){
      this.slides.slidePrev();
    }
    else{
      this.slides.slideNext();
    }
  }
  // Mudança de tela pra Esqueceu sua senha
  exibirEsqueceu() {
    this.login = false;
    this.esqueceu = true;
  }
  // Mudança de tela pro Login
  exibirLogin() {
    this.login = true;
    this.esqueceu = false;
  }

  loginForm={
    email:'',
    password:''
  }
  cadastroForm={
    nome:'',
    email:'',
    password:''
  }
  esqueceuForm={
    email:''
  }

  //Login
  async fazerLogin() {

    //Alert de falha Login1 - email inválido
    const alertFail1 = await this.alertController.create({
      header: 'Falha',
      message: 'Email inválido!',
      buttons: ['OK']
    });

    //Alert de falha Login2 - Usuário desabilitado
    const alertFail2 = await this.alertController.create({
      header: 'Falha',
      message: 'Sua conta foi desabilitada por tempo indeterminado!',
      buttons: ['OK']
    });

    //Alert de falha Login3 - Usuário não existe
    const alertFail3 = await this.alertController.create({
      header: 'Falha',
      message: 'Usuário não cadastrado! <br/> Faça seu cadastro para continuar!',
      buttons: ['OK']
    });

    const alertFail4 = await this.alertController.create({
      header: 'Falha',
      message: 'A senha paara o usuário digitado está incorreta!',
      buttons: ['OK']
    });

    //Load de processamento
    let load = await this.loadingController.create({
      message: 'Realizando Login',
    });
    await load.present();
    this.authProvider.login(this.loginForm)
      .then((res) => {
        let uid = res.user.uid;

        this.firebaseProvider.getUser(uid)
          .then((res) => {
            load.dismiss();
            let data = res.data();
            this.storage.set('usuario', data)
              .then(() => {
                load.dismiss();
                this.router.navigate(['master'])
              })

          })
      })
      .catch((erro) => {
        load.dismiss();
        if (erro.code == 'auth/invalid-email') {
          alertFail1.present();
        }
        else if (erro.code == 'auth/user-disabled') {
          alertFail2.present();
        }

        else if ('auth/user-not-found') {
          alertFail3.present();
        }
        else{
          alertFail4.present();
        }

      })
  }
  //Cadastro
  async fazerCadastro() {
    //Load de processando
    let load = await this.loadingController.create({
      message: 'Realizando Cadastro',
    });
    await load.present();

    //Alert de sucesso
    const alertSucesso = await this.alertController.create({
      header: 'Cadastro efetuado com sucesso!',
      message: 'Efetue o login para continuar!',
      buttons: ['OK']
    });

    //Alert de falha Cadastro1 - Email já está em uso
    const alertFail1 = await this.alertController.create({
      header: 'Falha',
      message: 'Esse email já sendo utilizado!',
      buttons: ['OK']
    });

    //Alert de falha Cadastro2 - email inválido
    const alertFail2 = await this.alertController.create({
      header: 'Falha',
      message: 'Email inválido!',
      buttons: ['OK']
    });

    //Alert de falha Cadastro3 - operação não permitida
    const alertFail3 = await this.alertController.create({
      header: 'Falha',
      message: 'Operação não permitida!',
      buttons: ['OK']
    });

    //Alert de falha Cadastro4 - Senha muito fraca
    const alertFail4 = await this.alertController.create({
      header: 'Falha',
      message: 'Sua senha está muito fraca!',
      buttons: ['OK']
    });


    this.authProvider.cadastro(this.cadastroForm)
      .then((res) => {
        load.dismiss();
        let uid = res.user.uid;

        //Organizar dados
        let data = {
          uid: uid,
          nome: this.cadastroForm.nome,
          email: this.cadastroForm.email,
        };

        //Gravar user no firestore
        this.firebaseProvider.postuser(data)
          .then(() => {
            load.dismiss();
            alertSucesso.present();
            this.exibirLogin();
          })
          .catch(()=>{
            load.dismiss();
          })
          
      })
      .catch((erro) => {
        load.dismiss();
        if (erro.code == 'auth/email-already-in-use') {
          alertFail1.present();
        }
        else if (erro.code == 'auth/invalid-email') {
          alertFail2.present();
        }
        else if (erro.code == 'auth/operation-not-allowed') {
          alertFail3.present();
        }
        else if(erro.code == 'auth/operation-not-allowed') {
          alertFail4.present();
        }
        else{
          console.log(erro);
        }

      })
  }

  //Resetar Senha
  async resetPassword() {
    let load = await this.loadingController.create({
      message: 'Realizando ação',
    });
    await load.present();

    //Alert de sucesso
    const alertSucesso = await this.alertController.create({
      header: 'Operação realizada com sucesso!',
      message: 'Solicitação foi enviada para o seu email',
      buttons: [
        {
          text: 'Voltar ao Login',
          handler: () => { 
            this.exibirLogin();
            alertSucesso.dismiss();
          }
        }
        ]
      
    });

    //Alert de falha Reset1 - Email inválido
    const alertFail1 = await this.alertController.create({
      header: 'Falha',
      message: 'Por favor, digite um email válido!',
      buttons: ['OK']
    });

    //Alert de falha Reset2 - Email não encontrado
    const alertFail2 = await this.alertController.create({
      header: 'Falha',
      message: 'Email não cadastrado!',
      buttons: ['OK']
    });

    this.authProvider.resetPass(this.esqueceuForm.email) 
    
    .then(()=>{
      load.dismiss();
      alertSucesso.present();
    })
    .catch((erro)=>{
      if(erro.code=='auth/invalid-email'){
        load.dismiss();
        alertFail1.present();
      }
      else{
        load.dismiss();
        alertFail2.present();
      }
    })
  }


}