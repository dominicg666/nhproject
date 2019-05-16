import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ApiService } from '../../services/api.service'
import { HelperService } from '../../services/helper.service';
import { NotificationNurse, NotificationsEntity } from '../../services/modal/notification-nurse.model';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
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
export class NotificationPage implements OnInit {
  pageOffset = 1;
  notificationList: (NotificationNurse) | null;
  constructor(public api: ApiService, private helper: HelperService, public loadingController: LoadingController, private router: Router, private navCtrl: NavController) { }

  getNotificationData(data: string): any {
    return JSON.parse(data);
  }
  ngOnInit() {

  }
  ionViewDidEnter() {
    this.getNotification();
  }
  doRefresh(event) {
    this.getNotification(event);
  }
  clickNotifcation(notification: NotificationsEntity) {
    this.api.notificationread({
      notificationid: notification.id
    }).subscribe(res => {
      this.getNotification();
    }, err => {
      this.getNotification();
    });
    let data = this.getNotificationData(notification.data);
    if (data.type == "1") {
      //Goes to avaiable jobs
      this.navCtrl.navigateForward('/nurse/tabs/home/detail/' + data.data.jobid);
    } else if (data.type == "2") {
      //care home
      this.router.navigate(['/care-home/tabs/shifts/upcoming-shifts', { jobid: data.data.jobid }]);
    } else if (data.type == "3") {
      this.router.navigate(['/nurse/tabs/myshifts/upcoming', { jobid: data.data.jobid }]);
    } else if (data.type == "4" || data.type == "5") {
      this.router.navigate(['/nurse/tabs/profile']);
    } else if (data.type == "6") {
      this.router.navigate(['/nurse/tabs/myshifts/completed', { jobid: data.data.jobid }]);
    }
    else if (data.type == "7") {
      this.router.navigate(['/care-home/tabs/signoff-request', { jobid: data.data.jobid }]);
    } else {

    }
  }
  getNotification(event = null) {

    if (this.api.uData != null && this.api.uData.userdata.myworkradious != null) {
      //this.myradiusBinding = this.api.uData.userdata.myworkradious;
    }
    this.pageOffset = 1;

    this.api.notificationNurse(
      {
        params: {
          _offset: 0,
          _limit: 10,
        }
      }
    ).subscribe((res: any) => {
      if (res[0].success) {
        this.notificationList = res[0].data;
      } else {
        this.notificationList.notifications = [];
        this.helper.presentToastWithOptions(res[0].message)
      }
      if (event != null) {
        event.target.complete();
      }

    }, err => {
      if (event != null) {
        event.target.complete();
      }
      this.notificationList.notifications = [];
      // this.helper.throwError(err.error.message)

    });
  }

  loadMore(infiniteScroll) {
    this.pageOffset = this.pageOffset + 10;
    this.api.notificationNurse(
      {
        params: {
          _offset: this.pageOffset,
          _limit: 10,
        }
      }, true
    ).subscribe((res: any) => {
      if (res[0].success) {
        for (let option of res[0].data.notifications) {
          this.notificationList.notifications.push(option);
        }
      } else {
        //this.helper.presentToastWithOptions(res[0].message)
      }
      if (res[0].data.notifications.length == 0) {
        //infiniteScroll.target.disabled = true;
        this.pageOffset = this.pageOffset - 10;
      }
      infiniteScroll.target.complete();

    }, err => {
      //this.helper.throwError(err.error.message)
      infiniteScroll.target.complete();
    });
  }
  getUserType() {
    let user = this.helper.getLocalStorage();
    return user;
  }

}
