
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/app/interfaces/aluno';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.page.html',
  styleUrls: ['./alunos.page.scss'],
})
export class AlunosPage implements OnInit {
  private alunos = new Array<Aluno>();
  private alunoSubscription : Subscription;

  constructor(private alunoService : AlunoService) {
    this.alunoSubscription = this.alunoService.getAlunos().subscribe(data=>{
      this.alunos = data;
    });
   }

  ngOnInit() {}

  ngOnDestroy(){
    this.alunoSubscription.unsubscribe
  }
}