import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from "@angular/router";
import { Animation } from '@ionic/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { WorksDetails,AvaiableworksdataEntity } from '../../../services/modal/works-details.model';
import { ApiService } from '../../../services/api.service'
import { HelperService } from '../../../services/helper.service';

@Component({
  selector: 'app-upcoming-shift-details',
  templateUrl: './upcoming-shift-details.page.html',
  styleUrls: ['./upcoming-shift-details.page.scss'],

  animations: [
    trigger('animationHeader', [      
      transition(':enter', [
        style({ opacity: 0}),
          animate('500ms', style({ opacity: 1}))
      ]),
      transition(':leave', [
        style({ opacity: 1}),
          animate('0ms', style({ opacity: 0}))
      ])
    ]),
    trigger('itemFadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('.5s ease-out', style({ opacity: '1' })),
      ]),
    ]),
  ]
})
export class UpcomingShiftDetailsPage implements OnInit {

  worksdataEntity?: (WorksDetails) | null;
  routeParams:any
  constructor( private activeRoute: ActivatedRoute, public api: ApiService,public loadingController: LoadingController, public  helper: HelperService,private router: Router,public alertController: AlertController, private navCtrl: NavController) { }

  ngOnInit() {
    this.routeParams = this.activeRoute.snapshot.params;
  }
  ionViewDidEnter(){
   this.getJobDetails();
  }
  backNavigation(){
    this.navCtrl.navigateBack('/nurse/tabs/myshifts/upcoming');
  }
  async getJobDetails(){
    this.api.upcomingShiftsjobDetails( {
      params: {
        jobid: this.routeParams.jobid
    }
  }).subscribe((res: any) => {
      if (res[0].success) {
        this.worksdataEntity = res[0].data;
        console.log(this.worksdataEntity);
      } else {
        this.helper.presentToastWithOptions(res[0].message)
      }

    }, err => {
      this.helper.throwError(err.error.message)

    });
  }

  backgroudHeaderColor = 'transparent';
  isScrolling(event) {
    if (event.detail.currentY>190) {
      this.backgroudHeaderColor='#265197'
    } else {
      this.backgroudHeaderColor='transparent'
    }
  }

}
