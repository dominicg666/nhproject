import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { AlertController, LoadingController } from '@ionic/angular';
import { Animation } from '@ionic/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Router } from '@angular/router';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { ApiService } from '../../../services/api.service'
import { HelperService } from '../../../services/helper.service';
import { PendingPayments } from '../../../services/modal/pending-payments.model';

@Component({
  selector: 'app-bank-account-pending',
  templateUrl: './bank-account-pending.page.html',
  styleUrls: ['./bank-account-pending.page.scss'],
  animations: [
    trigger('animationHeader', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0ms', style({ opacity: 0 }))
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
export class BankAccountPendingPage implements OnInit {
  pageOffset = 1;
  pendingPayments?: (PendingPayments) | null;
  constructor(public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    private router: Router, private nativePageTransitions: NativePageTransitions,
    public api: ApiService, public loadingController: LoadingController, private helper: HelperService) { }

  ngOnInit() {
    this.getPaymentPending();
  }
  ionViewDidEnter() {

  }
  doRefresh(event) {
    this.getPaymentPending(event);
  }
  async getPaymentPending(event = null) {
    this.pageOffset = 1;

    //await loading.present();

    this.api.paymentPending(
      {
        params: {
          _offset: 0,
          _limit: 10,
        }
      }
    ).subscribe((res: any) => {
      if (res[0].success) {
        this.pendingPayments = res[0].data;
      } else {
        //this.helper.presentToastWithOptions(res[0].message)
        this.pendingPayments = {
          jobdata: [],
          myshiftstatistics: []
        };
      }
      if (event != null) {
        event.target.complete();
      }

    }, err => {
      if (event != null) {
        event.target.complete();
      }
      //this.helper.throwError(err.error.message)
      this.pendingPayments = {
        jobdata: [],
        myshiftstatistics: []
      };

    });
  }
  loadMore(infiniteScroll) {
    this.pageOffset = this.pageOffset + 10;
    this.api.paymentPending(
      {
        params: {
          _offset: this.pageOffset,
          _limit: 10,

        }
      }
    ).subscribe((res: any) => {
      if (res[0].success) {
        for (let option of res[0].data.jobdata) {
          this.pendingPayments.jobdata.push(option);
        }
      } else {
        //this.helper.presentToastWithOptions(res[0].message)
      }
      if (res[0].data.jobdata.length == 0) {
        //infiniteScroll.target.disabled = true;
        this.pageOffset = this.pageOffset - 10;
      }
      infiniteScroll.target.complete();

    }, err => {
      // this.helper.throwError(err.error.message)
      infiniteScroll.target.complete();
    });
  }

  myswiperight() {
    const options: NativeTransitionOptions = {
      direction: 'left',
      duration: 400,
      slowdownfactor: -1,
      // slidePixels: 20,
      iosdelay: 50,
      // androiddelay: 150,
      // fixedPixelsTop: 0,
      // fixedPixelsBottom: 60
    };
    // this.nativePageTransitions.slide(options);
    this.router.navigate(['/nurse/tabs/payment-history/bank-account-settled']);
  }
}
