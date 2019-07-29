import { PerfilService } from './../../../services/perfil.service';

import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/app/interfaces/aluno';
import { Subscription } from 'rxjs';
import { AlunoService } from 'src/app/services/aluno.service';
import { ActivatedRoute } from '@angular/router';
import { Salas } from 'src/app/interfaces/salas';
import { SalasService } from 'src/app/services/salas.service';
import { Perfil } from 'src/app/interfaces/perfil';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  //Para trazer dados dos alunos
  private alunos = new Array<Aluno>();
  private alunosSubscription: Subscription;

  //Para trazer informações do aluno selecionado 
  private aluno: Aluno = {};
  private alunoSubscription: Subscription;
  private alunoId: string = null;

  //Para trazer dados do perfil
  private perfil: Perfil = {};
  private perfilSubscription : Subscription;
  private perfilId: string = null;


  //Para trazer dados da Sala logada
  private sala: Salas = {};
  private salaSubscription: Subscription;
  private salaId: string = null;
  sla;
  dataHoje;
  nE = 0;
  nI = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private alunoService: AlunoService,
    private alert: AlertController,
    private salaService: SalasService,
    private perfilService : PerfilService
  ) {
    // Perfil
    this.perfilId = this.activatedRoute.snapshot.params['uid'];
    if (this.perfilId) this.loadPerfil();

    //Sala
    this.salaId = this.activatedRoute.snapshot.params['id'];
    if (this.salaId) this.loadSala();

    // Data
    this.getDataHoje();

    //Aluno
    this.alunoId = this.activatedRoute.snapshot.params['id'];
    if(this.alunoId) this.loadAluno();

    // Alunos
    this.alunosSubscription = this.alunoService.getAlunos().subscribe(data => {
      this.alunos = data
    });
  }

  ionViewDidLoad() {

  }
  ngOnInit() {
  }

  //Puxando dados de perfil no firebase
  loadPerfil(){
    this.perfilService.perfilLogado;
    this.sla = this.perfilService.perfilLogado;
  }

  //Puxando dados da sala do firebase
  loadSala() {
    this.salaSubscription = this.salaService.getSala(this.salaId).subscribe(data => {
      this.sala = data;
    });
  }

  loadAluno(){
    this.alunoSubscription = this.alunoService.getAluno(this.alunoId).subscribe(value=>{
      this.aluno = value;
    })
  }

  //Implemaentação da data de hoje
  getDataHoje(){
    var dataObj = new Date();
    var ano = dataObj.getFullYear().toString();
    var mes = dataObj.getMonth().toString();
    var dia = dataObj.getDate().toString();

    var mesArray = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    this.dataHoje = dia + ' de ' + mesArray[mes] + ' de ' + ano;
  }

  //ALERT DE DÚVIDA AVALIÇÕES MENSAIS
  async duvidaAvaliacao() {
    const duvida = await this.alert.create({
      header: 'Avalie sua turma regularmente!',
      message: 'Trabalhar e avaliar os aspectos sociemocionais dos alunos regularmente é '+
      'essencial para a evolução da turma! <p class="center"> Nossa recomendação é:<br> <b class="roxo">02</b>'+
      ' avaliações de cada pilar socioemocional por mês </p>'+
      '<p>Para avaliar uma turma vá à sessão avaliar no menu inferior!</p>',

      buttons: ['ENTENDI!']
    });
    duvida.present();
  }

  //ALERT DE COMPORTAMENTO EXEMPLAR
  async comportamentoExemplar() {
    const exemplar = await this.alert.create({
      mode: 'ios',
      header: 'EXEMPLAR',
      cssClass: 'secondary',
      message: '<img src ="/assets/comportamento/exemplar.png">' +
      '<div class="fonte-alert-comportamento">'+
      '<p class="bold">Que bacana!</p>'+
      '<b class="roxo">'+this.aluno.nome+'</b> teve um comportamento <b class="amarelo">exemplar</b>'+
      ' e irá colecionar <b class="amarelo">+1</b>'+
      '<img src ="/assets/comportamento/exemplar.png" class="icone-comportamento-texto">'+
      '</p></div>',
      //iNPUTS DE DATA E DESCRIÇÃO
      inputs: [
        {
          name: 'Data',
          value: 'Coloque aqui a data da boa ação!',
          type: 'date'
        },
        {
          name: 'descricao',
          type: 'text',
          placeholder: 'Descreva brevemente a boa ação do(a) aluno(a)',
        }
      ],
      //BUTTONS CONFIRMAR OU CANCELAR EXEMPLAR
      buttons: [
        {
          cssClass: 'color="secondary"',
          text: '+1',
          handler: () => {

            this.aluno.exemplar;
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
          }
        }
      ]

    });
    exemplar.present();
  }

  async comportamentoInadequado() {
    const inadequado = await this.alert.create({
      mode: 'ios',
      header: 'INADEQUADO',
      message: '<img src ="/assets/comportamento/inadequado.png">' +
        '<div class="fonte-alert-comportamento">' +
        '<p class="bold">Que pena!</p>' +
        '<b class="roxo">'+this.aluno.nome+'</b> teve um comportamento <b class="roxo">inadequado </b>' +
        'e irá acumular <b class="roxo">+1</b><img src ="/assets/comportamento/inadequado.png" class="icone-comportamento-texto"> </p> </div>',
      //iNPUTS DE DATA E DESCRIÇÃO
      inputs: [
        {
          name: 'Data',
          value: 'Coloque aqui a data da má ação!',
          type: 'date'
        },
        {
          name: 'descricao',
          type: 'text',
          placeholder: 'Descreva brevemente o mal comportamento do(a) aluno(a)',
        }
      ],
      //BUTTONS CONFIRMAR OU CANCELAR INADEQUADO
      buttons: [
        {
          text: '+1',
          handler: () => {

            this.nI++;
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
          }
        }
      ]

    });
    inadequado.present();
  }
}
