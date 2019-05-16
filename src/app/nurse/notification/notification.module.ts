import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NotificationPage } from './notification.page';
import { SkeltonListSinglePageModule } from '../../directives/skelton/skelton-list-single/skelton-list-single.module';
const routes: Routes = [
  {
    path: '',
    component: NotificationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SkeltonListSinglePageModule
  ],
  declarations: [NotificationPage]
})
export class NotificationPageModule {}
