import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  splash= true;

  constructor() { }

  
  ngOnInit() {
    setTimeout(()=>{
      this.splash = false;
    }, 4000);
  }  
}
