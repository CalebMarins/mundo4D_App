import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//Firebase config
import {firebaseConfig} from '../configs/firebase';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';


//Providers
import {AuthProvider} from '../providers/auth'
import {FirebaseProvider} from '../providers/data'
import { Camera } from '@ionic-native/camera/ngx';

//Plugins
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { File } from '@ionic-native/file/ngx';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot(),
    AngularFireStorageModule
  ],
  providers: [
    AuthProvider, 
    FirebaseProvider,
    StatusBar,
    SplashScreen,
    Camera,
    File,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
