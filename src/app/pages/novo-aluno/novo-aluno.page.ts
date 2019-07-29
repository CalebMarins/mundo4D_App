import { AlunoService } from 'src/app/services/aluno.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthProvider } from './../../../providers/auth';
import { AlertController, LoadingController, ToastController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/app/interfaces/aluno';

@Component({
  selector: 'app-novo-aluno',
  templateUrl: './novo-aluno.page.html',
  styleUrls: ['./novo-aluno.page.scss'],
})
export class NovoAlunoPage implements OnInit {
  
  private aluno : Aluno = {};
  private loading : any;
  private alunoId : string = null;
  private alunoSubscription : Subscription;
  

  constructor(
    private alert : AlertController,
    private loadingController : LoadingController,
    private toastC : ToastController,
    private navctrl : NavController,
    private ap : AuthProvider,
    private activatedRoute : ActivatedRoute,
    private alunoService : AlunoService
    ) {
      this.alunoId = this.activatedRoute.snapshot.params['id'];

      if(this.alunoId) this.loadAluno();
     }

  ngOnInit() {
  }

  voltar(){
    this.navctrl.back();
  }

  loadAluno(){
    this.alunoSubscription = this.alunoService.getAluno(this.alunoId).subscribe(data=>{
      this.aluno = data;
    });
  }

  // SALVAR SALA DE AULA
  async salvarAluno() {
    //Mostrando o Loading
    await this.mostrarLoading();
    this.aluno.userId = this.ap.getAuth().currentUser.uid;

    if(this.alunoId){
      try {
        await this.alunoService.updateALuno(this.alunoId, this.aluno);
        this.loading.dismiss();
        this.navctrl.navigateBack('/alunos');
        this.mostrarToast('<b class="roxo">'+this.aluno.nome+'</b> atualizado(a) com sucesso!');
      } catch (error) {
        this.loading.dismiss();
        this.mostrarToast('Erro ao tentar editar o(a) aluno(a)');
      }

    }else{
      this.loading.dismiss();
      try {
        await this.alunoService.addAluno(this.aluno);
        this.loading.dismiss();
        this.navctrl.navigateBack('/alunos');
        this.mostrarToast('<b class="roxo">'+this.aluno.nome+'</b> criado(a) com sucesso!');
      } catch (error) {
        this.loading.dismiss();
        this.mostrarToast('Erro ao tentar criar aluno(a)');
        
      }
    }
  }

  //Loading
  async mostrarLoading(){
    this.loading = await this.loadingController.create({
      message:'Por favor, aguarde...'
    });
    return this.loading.present();
  }

  //Toast
  async mostrarToast(message: string){
    const toast = await this.toastC.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  //ALERT DE DÚVIDA DE INICIAL
  async duvidaInicial(){
    const duvida = await this.alert.create({
      header: 'Coloque aqui a inicial do aluno',
      message: 'Coloque <b class="roxo">M</b> para <b class="roxo">Maria</b>, <b class="roxo">J</b> para <b class="roxo">João Pedro</b> e por aí vai... <b class="roxo">:)</b></p>',

      buttons: ['OK']
    });
    duvida.present();
  }



  //ALERT DE DÚVIDA LINK DE FOTO
  async duvidaFoto() {
    const duvida = await this.alert.create({
      header: 'Inserir link de imagem',
      message: 'Que tal pegar a foto de pefil do <b class="roxo">Facebook</b> desse(a) seu(sua) aluno(a)?! <p> Fica muito bonito, pode confiar! <b class="roxo">:)</b></p>',

      buttons: ['OK']
    });
    duvida.present();
  }

}
