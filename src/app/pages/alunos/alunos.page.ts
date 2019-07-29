import { AngularFirestore } from 'angularfire2/firestore';
import { ToastController, AlertController, NavController } from '@ionic/angular';
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
  todosAlunos = true;
  private alunos = new Array<Aluno>();
  private alunoSubscription : Subscription;

  private alunosArr = [];
  private resultArr=[];

  constructor(
    private alunoService : AlunoService,
    private toastC : ToastController,
    private alert : AlertController,
    private nav : NavController,
    public fs : AngularFirestore
    ) {
    this.alunoSubscription = this.alunoService.getAlunos().subscribe(data=>{
      this.alunos = data;
    });
   }

  ngOnInit() {
    
  }

  ngOnDestroy(){
    this.alunoSubscription.unsubscribe
  }

  voltar(){
    this.nav.back();
  }

  search(event){
    let pesquisa:string = event.target.value;
    let primeiraLetra = pesquisa.toUpperCase();

    if(pesquisa.length==0){
      this.alunosArr =[];
      this.resultArr=[];
      this.todosAlunos = true;
    }

    if(this.alunosArr.length==0){
      this.fs.collection('Alunos', ref=>ref.where('pesquisa', '==', primeiraLetra)).snapshotChanges().subscribe(data=>{
        data.forEach(dataChild=>{
          this.alunosArr.push(dataChild.payload.doc.data());
          
        })
      })
    }
    else{
      this.todosAlunos=false;
      this.resultArr=[];
      this.alunosArr.forEach(val=>{
        let nome:string = val['nome'];
        if(nome.toUpperCase().startsWith(primeiraLetra.toUpperCase())){
          if(true){
            this.resultArr.push(val);
          }
        }
      })
    }
  }

  async deleteAluno(id:string){
    const alertConfirma = await this.alert.create({
      header: 'Deletar aluno(a)',
      message: 'Você tem certeza que quer deletar esse(a) aluno(a)?',
      buttons: [
        {
          text: 'Sim, deletar',
          handler: () => { 
            try {
              this.alunoService.deleteAluno(id);
              this.mostrarToast('Aluno(a) deletada com sucesso!');
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