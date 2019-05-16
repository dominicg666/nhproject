import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-skelton-header',
  templateUrl: './skelton-header.page.html',
  styleUrls: ['./skelton-header.page.scss'],
})
export class SkeltonHeaderPage implements OnInit {
   @Input() innerHeader:false;
  constructor() { }

  ngOnInit() {
  }

}
