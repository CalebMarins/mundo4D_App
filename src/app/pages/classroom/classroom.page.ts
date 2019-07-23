import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController, NavController } from '@ionic/angular';
import { Salas } from 'src/app/interfaces/salas';
import { AuthProvider } from 'src/providers/auth';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SalasService } from 'src/app/services/salas.service';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.page.html',
  styleUrls: ['./classroom.page.scss'],
})
export class ClassroomPage implements OnInit {
  private sala: Salas = {};
  private salaId: string = null;
  private salaSubscription: Subscription;
  private loading : any;

  constructor(
    private alert: AlertController,
    private loadingController: LoadingController,
    private afAuth: AuthProvider,
    private toastC: ToastController,
    private activatedRoute: ActivatedRoute,
    private salaService: SalasService,
    private navcrtrl : NavController
  ) {
    this.salaId = this.activatedRoute.snapshot.params['id'];
    if (this.salaId) this.loadSala();
  }

  ngOnInit() {
  }
  ngOnDestroy(){
    if(this.salaSubscription) this.salaSubscription.unsubscribe();
  }

  loadSala() {
    this.salaSubscription = this.salaService.getSala(this.salaId).subscribe(data => {
      this.sala = data;
    });
  }

  //ALERT DE DÚVIDA LINK DE FOTO
  async duvidaFoto() {
    const duvida = await this.alert.create({
      header: 'Inserir link de imagem',
      message: 'Pegue uma imagem bem bonita da sua sala ou do colégio! <p>Copie o <b class="roxo">link</b> e cole aqui!</p>',

      buttons: ['OK']
    });
    duvida.present();
  }

  // SALVAR SALA DE AULA
  async salvarSala() {
    await this.mostrarLoading();   
    this.sala.userId = this.afAuth.getAuth().currentUser.uid;
    // Se a sala já tiver um ID - update
    if (this.salaId) {
      try {
        await this.salaService.updateSala(this.salaId, this.sala);
        this.loading.dismiss();
        this.navcrtrl.navigateBack('master/tabs/recursos');
        this.mostrarToast('Sala atualizada com sucesso!');
      } catch (error) {
        this.loading.dismiss();
        this.mostrarToast('Erro ao tentar editar Sala');
        
      }
    }
    // Senão criar uma nova sala
    else {
      this.loading.dismiss();
      try {
        await this.salaService.addSala(this.sala);
        this.loading.dismiss();
        this.navcrtrl.navigateBack('master/tabs/recursos');
        this.mostrarToast('Sala criada com sucesso!');
      } catch (error) {
        this.loading.dismiss();
        this.mostrarToast('Erro ao tentar criar Sala');
        
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

}
