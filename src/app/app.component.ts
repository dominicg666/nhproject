import { Component,ViewChild} from '@angular/core';

import { Platform,IonContent } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Router, RouterEvent } from '@angular/router';
import { MenuController, LoadingController } from '@ionic/angular';
import { ApiService } from './services/api.service';
import { HelperService } from './services/helper.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { NetworkService, ConnectionStatus } from './utils/network.service';
import { OfflineManagerService } from './utils/offline-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages_menu = [];

  selectedPath = '';
  @ViewChild('contentMenu') content: IonContent;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private oneSignal: OneSignal,
    private router: Router,
    public menuCtrl: MenuController,
    private api: ApiService,
    public loadingController: LoadingController,
    private helper: HelperService,
    private offlineManager: OfflineManagerService,
    private networkService: NetworkService,
    private keyboard: Keyboard
  ) {
    this.initializeApp();
    this.permissionMenu();
    this.helper.menuEvent.subscribe(data => {
      this.permissionMenu();
    });

    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
      this.menuCtrl.close();
    });

   

  }

  ionMenuOpen(){
    this.content.scrollToTop();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.oneSignalInit();
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#265197');
      this.hideSplashScreen();

      this.networkService.onNetworkChange().subscribe((status: ConnectionStatus) => {
        if (status == ConnectionStatus.Online) {
          this.offlineManager.checkForEvents().subscribe();
        }
      });


    });
  }

  hideSplashScreen() {
    if (this.splashScreen) {
      setTimeout(() => {
        this.splashScreen.hide();
      }, 500);
    }
  }

  permissionMenu() {
    let user = this.helper.getLocalStorage();
    if (user == null) {
      return true;
    }
    if (user.userdata.usertype == 1 || user.userdata.usertype == 2) {
      this.appPages_menu = this.helper.getNurseMenus();
    }
    else if (user.userdata.usertype == 3) {
      this.appPages_menu = this.helper.getNHMenus();
    } else if (user.userdata.usertype == 9 || user.userdata.usertype == 10) {
      this.appPages_menu = this.helper.geManagerMenus();
    }
  }

  oneSignalInit() {
    this.oneSignal.startInit('2566c70f-0aac-4623-8b11-4a0d14c0605f', '926803640097');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
    });

    this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
      let user = this.helper.getLocalStorage();
      if (user == null) {
        return;
      }
      if (user.userdata.usertype == 1 || user.userdata.usertype == 2) {
        this.router.navigate(['/nurse/tabs/notification']);
      }

    });

    this.oneSignal.endInit();
  }
  async logout() {
    const loading = await this.loadingController.create({
      message: '',
      spinner: null,
      cssClass:'custom-loader-animation'
    });
    await loading.present();
    this.api.logout().subscribe(res => {
      this.helper.clearLocalStorage();
      this.api.uData = null;
      this.api.uHomeData = null;
      this.api.pWizard = null;
      this.router.navigate(['/login'])
      loading.dismiss();
    }, err => {
      this.helper.clearLocalStorage();
      this.api.uData = null;
      this.api.uHomeData = null;
      this.router.navigate(['/login'])
      loading.dismiss();
    });
  }

}
