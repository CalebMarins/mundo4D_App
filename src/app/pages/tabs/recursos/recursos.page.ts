import { Component, OnInit } from '@angular/core';
import { Salas } from 'src/app/interfaces/salas';
import { Subscription } from 'rxjs';
import { SalasService } from 'src/app/services/salas.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.page.html',
  styleUrls: ['./recursos.page.scss'],
})
export class RecursosPage implements OnInit {

  private salas = new Array <Salas>();
  private salasSubscription: Subscription;
  constructor(
    private salaService : SalasService,
    private alert: AlertController,
    private toastC: ToastController
    ) {
    this.salasSubscription = this.salaService.getSalas().subscribe(data=>{
      this.salas = data;
    })
  }

  ngOnInit() {
  }
  
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  ngOnDestroy(){
    this.salasSubscription.unsubscribe();
  }

  async deleteSala(id:string){
    const alertConfirma = await this.alert.create({
      header: 'Deletar sala',
      message: 'Tem certeza que quer deletar essa sala?',
      buttons: [
        {
          text: 'Sim, deletar',
          handler: () => {
            try {
              this.salaService.deleteSala(id);
              this.mostrarToast('Sala deletada com sucesso!');
            } catch (error) {
              this.mostrarToast('Erro ao tentar deletar!');
            }
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

  async mostrarToast(message: string){
    const toast = await this.toastC.create({
      message,
      duration: 2000
    });
    toast.present();
  }

}
