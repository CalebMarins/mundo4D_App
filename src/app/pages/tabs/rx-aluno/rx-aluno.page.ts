import { AngularFirestore } from 'angularfire2/firestore';
import { Component, OnInit, ViewChild } from '@angular/core';
import {Chart} from 'chart.js';
import { Aluno } from 'src/app/interfaces/aluno';
import { Subscription } from 'rxjs';
import { AlunoService } from 'src/app/services/aluno.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-rx-aluno',
  templateUrl: './rx-aluno.page.html',
  styleUrls: ['./rx-aluno.page.scss'],
})
export class RxAlunoPage implements OnInit {

  private aluno: Aluno = {};
  private alunoSubscription: Subscription;
  private alunoId: string = null;

  // NOMEANDO GRÁFICO RADAR SOCIOEMOCIONAL
  @ViewChild ('radarCanvas') radarCanvas;
  @ViewChild ('colaboracaoLinesCanvas') colaboracaoLineCanvas;
  @ViewChild ('incansavelLinesCanvas') incansavelLineCanvas;
  @ViewChild ('originalLinesCanvas') originalLineCanvas;
  @ViewChild ('liderLinesCanvas') liderLineCanvas;
  @ViewChild ('zenLinesCanvas') zenLineCanvas;

  
  radarChart : any;
  lineChart : any;

  constructor(
   private fs : AngularFirestore,
   private alunoService: AlunoService,
   private activatedRoute: ActivatedRoute,
  ) { 
    this.alunoId = this.activatedRoute.snapshot.params['id'];
    if (this.alunoId) this.loadSala();

  }

  ngOnInit(){
  }
  
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  loadSala() {
    this.alunoSubscription = this.alunoService.getAluno(this.alunoId).subscribe(data => {
      this.aluno = data;
    });
  }

  ngAfterViewInit() {
    setTimeout(()=>{
      this.radarChart = this.getRadarChart();
      this.lineChart = this.getColaboracaoLineChart();
      this.lineChart = this.getIncansavelLineChart();
      this.lineChart = this.getOriginalLineChart();
      this.lineChart = this.getLiderLineChart();
      this.lineChart = this.getZenLineChart();
    }, 150)
  }

  getChart(ctx, chartType, data){
    return new Chart(ctx,{
      data,
      type: chartType
    })
  }

  // GRÁFICO RADAR SOCIOEMOCIONAL
  getRadarChart(){
    var data ={
      labels: ['Camarada', 'Incansável', 'Líder', 'Original', 'Zen'],
      datasets: [{
        data: [12,21,23,25,5],
        label:'Aluno',
        fill: true,
        backgronudColor: '#682189',
        borderCapStyle: 'butt',
        borderColor: '#682189',
        borderWidth:3,
        lineTension: 0,
        pointBorderColor: '#682189',
        pointHitRadius:15,
      }, 
    {
      label:'Sala de aula',
        data: [15,13,8,17,15],
        backgronudColor: 'rgba(240, 203, 131, 0.932);',
        borderCapStyle: 'butt',
        borderColor: '#FCB018',
        borderWidth:3,
        lineTension: 0,
        pointBorderColor: '#FCB018',
        pointHitRadius: 2,
        borderJoinStyle: 'miter',
        defaultFontSize: 20,
    }]
    }
  
    // INTEGRANDO GRÁFICO, dizendo o tipo de gráfico 
    return this.getChart(this.radarCanvas.nativeElement, 'radar', data);
  }

  // GRÁFICO COLABORAÇÃO
  getColaboracaoLineChart(){
    var data ={
      labels: ['1°Bimestre', '2°Bimestre', '3°Bimestre', '4°Bimestre'],
      datasets: [{
        data: [12,21, 34, 3],
        label:'Aluno',
        fill: true,
        backgronudColor: '#682189',
        borderCapStyle: 'butt',
        borderColor: '#682189',
        borderWidth:3,
        lineTension: 0.1,
        pointBorderColor: '#682189',
        pointHitRadius:15,
      }]
  }
  // INTEGRANDO GRÁFICO - tipo lines
  return this.getChart(this.colaboracaoLineCanvas.nativeElement, 'line', data);
}

// GRÁFICO INCANSÁVEL
getIncansavelLineChart(){
  var n1I, n2I, n3I, n4I;
  n1I=3;
  n2I=9;
  n3I=7;
  n4I=18;
  
  var data ={
    labels: ['1°Bimestre', '2°Bimestre', '3°Bimestre', '4°Bimestre'],
    datasets: [{
      data: [n1I, n2I, n3I, n4I],
      label:'Aluno',
      fill: true,
      backgronudColor: '#FCB018',
      borderCapStyle: 'butt',
      borderColor: '#FCB018',
      borderWidth:3,
      lineTension: 0.1,
      pointBorderColor: '#FCB018',
      pointHitRadius:15,
    }]
}
// INTEGRANDO GRÁFICO - tipo lines
return this.getChart(this.incansavelLineCanvas.nativeElement, 'line', data);
}

// GRÁFICO ORIGINAL
getOriginalLineChart(){
  var data ={
    labels: ['1°Bimestre', '2°Bimestre', '3°Bimestre', '4°Bimestre'],
    datasets: [{
      data: [5,18, 13, 20],
      label:'Aluno',
      fill: true,
      backgronudColor: '#FCB018',
      borderCapStyle: 'butt',
      borderColor: '#FCB018',
      borderWidth:3,
      lineTension: 0.1,
      pointBorderColor: '#FCB018',
      pointHitRadius:15,
    }]
}
// INTEGRANDO GRÁFICO - tipo lines
return this.getChart(this.originalLineCanvas.nativeElement, 'line', data);
}

// GRÁFICO LÍDER
getLiderLineChart(){
  var data ={
    labels: ['1°Bimestre', '2°Bimestre', '3°Bimestre', '4°Bimestre'],
    datasets: [{
      data: [15, 7, 22, 17],
      label:'Aluno',
      fill: true,
      backgronudColor: '#682189',
      borderCapStyle: 'butt',
      borderColor: '#682189',
      borderWidth:3,
      lineTension: 0.1,
      pointBorderColor: '#682189',
      pointHitRadius:15,
    }]
}
// INTEGRANDO GRÁFICO - tipo lines
return this.getChart(this.liderLineCanvas.nativeElement, 'line', data);
}


// GRÁFICO ZEN
getZenLineChart(){
  var data ={
    labels: ['1°Bimestre', '2°Bimestre', '3°Bimestre', '4°Bimestre'],
    datasets: [{
      data: [8, 22, 14, 17],
      label:'Aluno',
      fill: true,
      backgronudColor: '#FCB018',
      borderCapStyle: 'butt',
      borderColor: '#FCB018',
      borderWidth:3,
      lineTension: 0.1,
      pointBorderColor: '#FCB018',
      pointHitRadius:15,
    }]
}
// INTEGRANDO GRÁFICO - tipo lines
return this.getChart(this.zenLineCanvas.nativeElement, 'line', data);
}


}
