import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.page.html',
  styleUrls: ['./initial.page.scss'],
})
export class InitialPage implements OnInit {

  splash = true;
  initial = false;
  constructor() { }

  ngOnInit() {
    //Definindo tempo de splash screen
    setTimeout(()=>{
      this.splash = false;
      this.initial = true;
    }, 4000);
  }

}
