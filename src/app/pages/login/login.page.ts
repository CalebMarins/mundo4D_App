import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides) slides : IonSlides;

  //Divisão de telas
  splash= true;
  login= true;
  esqueceu= false;

  constructor() { }

  
  ngOnInit() {
    //Definindo tempo de splash screen
    setTimeout(()=>{
      this.splash = false;
    }, 4000);
  } 
  // Definindo evento de clique no segmento
  segmentChanged(event : any){
    if (event.detail.value ==="login"){
      this.slides.slidePrev();
    }
    else{
      this.slides.slideNext();
    }
  }
  // Mudança de tela pra Esqueceu sua senha
  exibirEsqueceu() {
    this.login = false;
    this.esqueceu = true;
  }
  // Mudança de tela pro Login
  exibirLogin() {
    this.login = true;
    this.esqueceu = false;
  }

}
