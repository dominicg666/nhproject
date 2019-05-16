import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from './../../services/api.service'
import { HelperService } from './../../services/helper.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
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
export class HelpPage implements OnInit {
  helpData?: (HelpData) | null;
  pageOffset = 1;
  searchModel: string = '';
  ionInputLoader: boolean = false;
  constructor(public api: ApiService, private helper: HelperService,private route:Router) { }

  ngOnInit() {
    this.searchModel = '';
    this.getHelpList();
  }
  ionViewDidLoad() {

  }

  doRefresh(event) {
    this.getHelpList(event);
  }
  searchHelp() {
    this.getHelpList(event = null);
  }

  async getHelpList(event = null) {
    this.pageOffset = 1;
    if (this.searchModel.length < 3 && this.searchModel.length != 0) {
      return;
    }
    if (this.searchModel.length != 0)
      this.ionInputLoader = true;

    this.api.getHelp({
      params: {
        txtsearch: this.searchModel
      }
    }).subscribe((res: any) => {
      if (res[0].success) {
        this.helpData = res[0].data;
      } else {
        this.helpData = {
          contents: [],
          searchtxt: ''
        }
      }
      this.ionInputLoader = false;
      if (event != null) {
        event.target.complete();
      }

    }, err => {
      this.ionInputLoader = false;
      if (event != null) {
        event.target.complete();
      }
      this.helpData = {
        contents: [],
        searchtxt: ''
      }
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

}


export interface HelpData {
  contents?: (ContentsEntity)[] | null;
  searchtxt: string;
}
export interface ContentsEntity {
  categoryname: string;
  cateid: number;
  questions?: (QuestionsEntity)[] | null;
}
export interface QuestionsEntity {
  helpid: number;
  question: string;
  answer: string;
  cateid: number;
  categoryname: string;
}
