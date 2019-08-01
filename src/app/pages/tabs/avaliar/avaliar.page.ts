import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Aluno } from 'src/app/interfaces/aluno';
import { Subscription } from 'rxjs';
import { AlunoService } from 'src/app/services/aluno.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-avaliar',
  templateUrl: './avaliar.page.html',
  styleUrls: ['./avaliar.page.scss'],
})
export class AvaliarPage implements OnInit {

  nothing = true;
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
  aluninho = false;

  duvidaTuto = true;
  voltarTuto = false;

  private alunos = new Array<Aluno>();
  private alunoSubscription : Subscription;

  constructor(
    private router: Router,
    private alert: AlertController,
    private alunoService : AlunoService,
    ) {
    this.alunoSubscription = this.alunoService.getAlunos().subscribe(data=>{
      this.alunos = data
    });
  }

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
    this.aluninho = true;
    this.incansavel = false;
    this.lider = false;
    this. original = false;
    this.zen = false;
    this.tuto = false;
    this.nothing = false;
  }
  expandirIncansavel() {
    this.incansavel = true;
    this.aluninho = true;
    this.camarada = false;
    this.lider = false;
    this. original = false;
    this.zen = false;
    this.tuto = false;
    this.nothing = false;
  }

  expandirLider() {
    this.lider = true;
    this.aluninho = true;
    this.camarada = false;
    this.incansavel = false;
    this. original = false;
    this.zen = false;
    this.tuto = false;
    this.nothing = false;
  }

  expandirOriginal() {
    this.original = true;
    this.aluninho = true;
    this.camarada = false;
    this.incansavel = false;
    this. lider = false;
    this.zen = false;
    this.tuto = false;
    this.nothing = false;
  }

  expandirZen() {
    this.zen = true;
    this.aluninho = true;
    this.camarada = false;
    this.incansavel = false;
    this. lider = false;
    this.original = false;
    this.tuto = false;
    this.nothing = false;
  }
  expandirAvaliarTuto(){
    this.tuto = true;
    this.duvidaTuto = false;
    this.voltarTuto = true;
  }

  retrairAvaliarTuto(){
    this.tuto= false;
    this.duvidaTuto = true;
    this.voltarTuto = false;
  }


  

}
