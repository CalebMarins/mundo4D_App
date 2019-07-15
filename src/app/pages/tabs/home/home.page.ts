import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private alert : AlertController
  ) { }

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

}
