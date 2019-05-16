import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { UpcomingPage } from './upcoming.page';
import { PopoverComponent } from '../../popover/popover.component';

import { SkeltonHeaderPageModule } from '../../../directives/skelton/skelton-header/skelton-header.module';
import { SkeltonListPageModule } from '../../../directives/skelton/skelton-list/skelton-list.module';

const routes: Routes = [
  {
    path: '',
    component: UpcomingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SkeltonHeaderPageModule,
    SkeltonListPageModule
  ],

  providers:[CallNumber],
  declarations: [UpcomingPage,PopoverComponent],
  entryComponents: [PopoverComponent],
})
export class UpcomingPageModule {}
