import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(
    private loading : LoadingController,
    private alert : AlertController,
    private router : Router,
    private navCtrl : NavController
  ) {
   }

  ngOnInit() {
  }

  //Voltar para página antes do perfil
  voltar(){
    this.navCtrl.back();
  }

  //Ir para salas
  salas(){
    this.router.navigate(['master/tabs/recursos']);
  }
  //Ir para alunos
  alunos(){
    this.router.navigate(['/alunos']);
  }

  //Editar perfil
  editarPerfil(){
    this.router.navigate(['/edit-perfil']);
  }
  
  //Método de logout
  async signOut() {
    //Load de processamento
    let loadOut = await this.loading.create({
     message: 'Encerrando sessão',
   });
   //Alert Confirmação
   const alertConfirma = await this.alert.create({
     header: 'Encerrar sessão',
     message: 'Tem certeza que deseja sair?',
     buttons: [
       {
         text: 'Sim, quero sair',
         handler: () => {
           
           this.router.navigate(['/login'])
         }
       },
       {
         text: 'Cancelar',
         handler: () => {
         }
       }
     ]
   });
   
   alertConfirma.present();
  }
}