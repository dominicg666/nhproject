import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InboxPage } from './inbox.page';
import { SkeltonListPageModule } from '../../directives/skelton/skelton-list/skelton-list.module';

const routes: Routes = [
  {
    path: '',
    component: InboxPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SkeltonListPageModule
  ],
  declarations: [InboxPage]
})
export class InboxPageModule {}
