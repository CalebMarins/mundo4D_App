import { AngularFireStorage } from '@angular/fire/storage';
import { AuthProvider } from './../../../providers/auth';
import { Aluno } from 'src/app/interfaces/aluno';
import { AlunoService } from 'src/app/services/aluno.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ToastController, NavController, Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-novo-aluno',
  templateUrl: './novo-aluno.page.html',
  styleUrls: ['./novo-aluno.page.scss'],
})
export class NovoAlunoPage implements OnInit {
  //Porcntagem de upload da imagem
  public uploadPercent : Observable<number>;

  //URL da imagem baixada
  public downloadUrl : Observable<string>;


  // Desclarações para aluno
  private aluno : Aluno = {};
  private alunoId : string = null;
  private alunoSubscription : Subscription;
  
  // Declaração para utilizar o loading
  private loading : any;

  constructor(
    private ap : AuthProvider,
    private alert : AlertController,
    private loadingController : LoadingController,
    private toastC : ToastController,
    private navctrl : NavController,
    private activatedRoute : ActivatedRoute,
    private alunoService : AlunoService, 
    private camera : Camera,
    private platform : Platform,
    private arquivo : File,
    private afs : AngularFireStorage
    ) {
      this.alunoId = this.activatedRoute.snapshot.params['id'];

      if(this.alunoId) this.loadAluno();
     }

  ngOnInit() {
  }

  //Voltar página
  voltar(){
    this.navctrl.back();
  }

  //Carregar aluno salvo
  loadAluno(){
    this.alunoSubscription = this.alunoService.getAluno(this.alunoId).subscribe(data=>{
      this.aluno = data;
    });
  }

  //Método para abrir a galeria
  async abrirGaleria(){
    const options : CameraOptions ={
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true
    };
    try{
      const fileUrl : string = await this.camera.getPicture(options);

      let file : string;
      if(this.platform.is('ios')){
        file = fileUrl.split('/').pop();
      }
      else{
        file = fileUrl.substring(fileUrl.lastIndexOf('/')+1, fileUrl.indexOf('?')); 
      }
      const path:string  = fileUrl.substring(0, fileUrl.lastIndexOf('/'));
      const buffer : ArrayBuffer = await this.arquivo.readAsArrayBuffer(path, file);
      const blob : Blob = new Blob([buffer], {type:'image.jpg'});
      this.uploadPicture(blob, file);
      this.aluno.picture = this.downloadUrl.toString();
    }

    catch(error){
      console.error(error);
    }
  }

  //Método de upload
  uploadPicture(blob:Blob, file:string){
    const ref = this.afs.ref('alunos/'+file);
    const tarefa = ref.put(blob);

    //Porcentagem do upload
    this.uploadPercent = tarefa.percentageChanges();

    //URL da imagem 
    tarefa.snapshotChanges().pipe(
      finalize(()=>this.downloadUrl = ref.getDownloadURL())
    ).subscribe();
  }

  // SALVAR ALUNO
  async salvarAluno() {
    //Mostrando o Loading
    await this.mostrarLoading();
    this.aluno.userId = this.ap.getAuth().currentUser.uid;

    if(this.alunoId){
      try {
        await this.alunoService.updateALuno(this.alunoId, this.aluno);
        this.loading.dismiss();
        this.navctrl.navigateBack('/alunos');
        this.mostrarToast('<b class="roxo">'+ this.aluno.nome+' '+ this.aluno.sobrenome+'</b> atualizado(a) com sucesso!');
      } catch (error) {
        this.loading.dismiss();
        this.mostrarToast('Erro ao tentar editar'+ this.aluno.nome+' '+ this.aluno.sobrenome);
      }

    }else{
      this.loading.dismiss();
      try {
        await this.alunoService.addAluno(this.aluno);
        this.loading.dismiss();
        this.navctrl.navigateBack('/alunos');
        this.mostrarToast('<b class="roxo">'+ this.aluno.nome+' '+ this.aluno.sobrenome+'</b> criado(a) com sucesso!');
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
