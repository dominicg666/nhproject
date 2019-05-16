import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { SkeltonHeaderPageModule } from '../../directives/skelton/skelton-header/skelton-header.module';
import { IonicModule } from '@ionic/angular';

import { ReferAFriendPage } from './refer-a-friend.page';
import { PipeModuleModule } from '../../pipe/pipe-module.module';


const routes: Routes = [
  {
    path: '',
    component: ReferAFriendPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SkeltonHeaderPageModule,
    PipeModuleModule
  ],
  providers: [
   SocialSharing
  ],
  declarations: [ReferAFriendPage]
})
export class ReferAFriendPageModule {}
