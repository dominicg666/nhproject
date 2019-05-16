import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';

import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network/ngx';
import { NetworkService } from './utils/network.service';
import { OfflineManagerService } from './utils/offline-manager.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import 'hammerjs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//quard
import { AuthGuardService } from './services/AuthGuard/auth-guard.service';
import { NurseGuardService } from './services/AuthGuard/nurse-guard.service';
import { NurseHomeGuardService } from './services/AuthGuard/nurse-home-guard.service';
//end quard
import { HelperService } from './services/helper.service';
import { ApiService } from './services/api.service';

export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    'swipe': { velocity: 0.4, threshold: 20 } // override default settings
  };
}
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,IonicStorageModule.forRoot(), BrowserAnimationsModule,HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    OneSignal,
    AuthGuardService,
    NurseGuardService,
    NurseHomeGuardService,
    HelperService,
    ApiService,
    NativePageTransitions,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    },
    Network,
    NetworkService,
    OfflineManagerService,
    Keyboard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
