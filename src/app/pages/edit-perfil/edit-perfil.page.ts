import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-perfil',
  templateUrl: './edit-perfil.page.html',
  styleUrls: ['./edit-perfil.page.scss'],
})
export class EditPerfilPage implements OnInit {

  constructor(
    private nav : NavController
  ) { }

  ngOnInit() {
  }

  voltar(){
    this.nav.back();
  }
}
