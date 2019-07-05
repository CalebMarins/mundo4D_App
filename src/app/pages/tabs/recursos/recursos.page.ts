import { Component, OnInit } from '@angular/core';
import { Salas } from 'src/app/interfaces/salas';
import { Subscription } from 'rxjs';
import { SalasService } from 'src/app/services/salas.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.page.html',
  styleUrls: ['./recursos.page.scss'],
})
export class RecursosPage implements OnInit {

  private loading : any;
  private salas = new Array <Salas>();
  private salasSubscription: Subscription;
  constructor(
    private salaService : SalasService,
    private loadingController: LoadingController,
    private toastC: ToastController
    ) {
    this.salasSubscription = this.salaService.getSalas().subscribe(data=>{
      this.salas = data;
    })
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.salasSubscription.unsubscribe();
  }

  async deleteSala(id:string){
    await this.mostrarLoading();   
    try {
      await this.salaService.deleteSala(id);
      this.loading.dismiss();
      this.mostrarToast('Sala deletada com sucesso!');
    } catch (error) {
      this.loading.dismiss();
      this.mostrarToast('Erro ao tentar deletar!');
    }
  }

  async mostrarLoading(){
    this.loading = await this.loadingController.create({
      message:'Por favor, aguarde...'
    });
    return this.loading.present();
  }
  async mostrarToast(message: string){
    const toast = await this.toastC.create({
      message,
      duration: 2000
    });
    toast.present();
  }

}
