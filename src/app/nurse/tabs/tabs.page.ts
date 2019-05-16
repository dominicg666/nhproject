import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { HelperService } from '../../services/helper.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  constructor(public menuCtrl: MenuController, private helper: HelperService, public api:ApiService) {
    // menuCtrl.enable(false,'carehome');
   
  }
  ngOnInit() {
    // this.helper.menuEvent.emit();
    
  }
  ionViewDidEnter(){
    this.menuCtrl.enable(true,'sidemenu');
    this.helper.menuEvent.emit();
  }
  menuToggle() {
    this.menuCtrl.toggle();
  }

}
