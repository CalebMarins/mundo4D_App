import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  rootPage: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage : Storage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.storage.get('usuario')
      .then((usuario)=>{
        if(usuario){
          this.rootPage='HomePage'
        }
        else{
          this.rootPage='LoginPage'
        }
      })

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
