import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { NavController } from '@ionic/angular';
import { ApiService } from './../../services/api.service'
import { HelperService } from './../../services/helper.service';
import { ChatInbox, ChatdataEntity } from './../../services/modal/chat-inbox.model';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
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
export class InboxPage implements OnInit {

  chatInbox?: ChatInbox | null;
  pageOffset = 1;
  constructor(public api: ApiService, private helper: HelperService, private navCtrl: NavController,private route:Router) { }

  ngOnInit() {
    this.getInboxList();
  }
  ionViewDidEnter() {
    this.api.messageRead({}).subscribe((res: any) => {
      if (res[0].success) {
      } else {
      }
    }, err => { });

  }

  doRefresh(event) {
    this.getInboxList(event);
  }
  clickViewChat(option: ChatdataEntity) {
    let user = this.helper.getLocalStorage();
    if (user == null) {
      return true;
    }
    if (user.userdata.usertype == 1 || user.userdata.usertype == 2) {
      this.navCtrl.navigateForward('/nurse/tabs/inbox/chat/' + option.id + '?userimg=' + encodeURI(option.myimage) + '&username=' + option.username);
    }
    else {
      this.navCtrl.navigateForward('/care-home/tabs/inbox/chat/' + option.id + '?userimg=' + encodeURI(option.myimage) + '&username=' + option.username);
    }

  }

  async getInboxList(event = null) {
    this.pageOffset = 1;
    this.api.userListInbox({
      params: {
        _offset: 0,
        _limit: 10,
      }
    }).subscribe((res: any) => {
      if (res[0].success) {
        this.chatInbox = res[0].data;
      } else {
        // this.helper.presentToastWithOptions(res[0].message)
        this.chatInbox = {
          chatdata: []
        }
      }
      if (event != null) {
        event.target.complete();
      }

    }, err => {
      if (event != null) {
        event.target.complete();
      }

      this.chatInbox = {
        chatdata: []
      }


    });
  }

  loadMore(infiniteScroll) {
    this.pageOffset = this.pageOffset + 10;
    this.api.userListInbox(
      {
        params: {
          _offset: this.pageOffset,
          _limit: 10,

        }
      },
      true
    ).subscribe((res: any) => {
      if (res[0].success) {
        for (let option of res[0].data.chatdata) {
          this.chatInbox.chatdata.push(option);
        }
      } else {
        //this.helper.presentToastWithOptions(res[0].message)
      }
      if (res[0].data.chatdata.length == 0) {
        //infiniteScroll.target.disabled = true;
        this.pageOffset = this.pageOffset - 10;
      }
      infiniteScroll.target.complete();

    }, err => {
      //this.helper.throwError(err.error.message)
      infiniteScroll.target.complete();
    });
  }
  notificationNav(){
    let user = this.helper.getLocalStorage();
    if (user == null) {
      return true;
    }
    if (user.userdata.usertype == 1 || user.userdata.usertype == 2) {
      this.route.navigate(['/nurse/tabs/notification']);
    }

    
  }
  getUserType(){
    let user = this.helper.getLocalStorage();
    return  user;
  }



}
