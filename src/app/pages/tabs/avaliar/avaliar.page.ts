import { Component, OnInit } from '@angular/core';
import { generateExpandoInstructionBlock } from '@angular/core/src/render3/instructions';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-avaliar',
  templateUrl: './avaliar.page.html',
  styleUrls: ['./avaliar.page.scss'],
})
export class AvaliarPage implements OnInit {

  camarada = false;
  incansavel = false;
  lider = false;
  original = false;
  zen = false;
  camarada1 = false;
  incansavel1 = false;
  lider1 = false;
  original1 = false;
  zen1 = false;
  tuto=false;


  constructor(
    private alert: AlertController
  ) { }

  ngOnInit() {
  }

  //ALERT DE DÚVIDA NOME DA ATIVIDADE
  async duvidaNomeAtiv() {
    const duvida = await this.alert.create({
      header: 'Inserir uma atividade',
      message: 'Antes de tudo você precisa dar um nome para sua atividade',

      buttons: ['OK']
    });
    duvida.present();
  }

  expandirCamarada() {
    this.camarada = true;
    this.incansavel = false;
    this.lider = false;
    this. original = false;
    this.zen = false;
    this.tuto = false;
  }
  expandirIncansavel() {
    this.incansavel = true;
    this.camarada = false;
    this.lider = false;
    this. original = false;
    this.zen = false;
    this.tuto = false;
  }

  expandirLider() {
    this.lider = true;
    this.camarada = false;
    this.incansavel = false;
    this. original = false;
    this.zen = false;
    this.tuto = false;
  }

  expandirOriginal() {
    this.original = true;
    this.camarada = false;
    this.incansavel = false;
    this. lider = false;
    this.zen = false;
    this.tuto = false;
  }

  expandirZen() {
    this.zen = true;
    this.camarada = false;
    this.incansavel = false;
    this. lider = false;
    this.original = false;
    this.tuto = false;
  }
  expandirAvaliarTuto(){
    this.tuto = true;
    
  }

  retrairAvaliarTuto(){
    
    this.tuto= false;
  }

  

}
