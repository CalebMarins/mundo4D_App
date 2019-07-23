
import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/app/interfaces/aluno';
import { Subscription } from 'rxjs';
import { AlunoService } from 'src/app/services/aluno.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private alunos = new Array<Aluno>();
  private alunoSubscription: Subscription;
  nE = 0;
  nI = 0;

  constructor(
    private alunoService: AlunoService,
    private alert: AlertController
  ) {
    this.alunoSubscription = this.alunoService.getAlunos().subscribe(data => {
      this.alunos = data
    });
  }

  ionViewDidLoad(){
   
  }
  ngOnInit() {
  }

  //ALERT DE DÚVIDA AVALIÇÕES MENSAIS
  async duvidaAvaliacao() {
    const duvida = await this.alert.create({
      header: 'Avalie sua turma regularmente!',
      message: 'Trabalhar e avaliar os aspectos sociemocionais dos alunos regularmente é essencial para a evolução da turma! <p class="center"> Nossa recomendação é:<br> <b class="roxo">02</b> avaliações de cada pilar socioemocional por mês </p> <p>Para avaliar uma turma vá à sessão avaliar no menu inferior!</p>',

      buttons: ['ENTENDI!']
    });
    duvida.present();
  }

  //ALERT DE COMPORTAMENTO EXEMPLAR
  async comportamentoExemplar() {
    const exemplar = await this.alert.create({
      header: 'EXEMPLAR',
      message: 'Que bacana! <p> Esse(a) aluno(a) teve um comportamento <b class="amarelo">exemplar</b> e irá colecionar <b class="amarelo">+1</b> coração!</p>',
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
      //BUTTONS CONFIRMAR OU CANCELAR INADEQUADO
      buttons: [
        {
          text: '+1',
          handler: () => {

            this.nE++;
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
      header: 'INADEQUADO',
      message: 'Que pena! <p> Esse(a) aluno(a) teve um comportamento <b class="roxo">inadequado</b> e irá acumular <b class="roxo">+1</b> inapropriado!</p>',
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
