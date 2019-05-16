import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CompletedPage } from './completed.page';
import { BrMaskerModule } from '../../../directives/mask';
import { SkeltonHeaderPageModule } from '../../../directives/skelton/skelton-header/skelton-header.module';
import { SkeltonListSinglePageModule } from '../../../directives/skelton/skelton-list-single/skelton-list-single.module';

const routes: Routes = [
  {
    path: '',
    component: CompletedPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SkeltonListSinglePageModule,
    SkeltonHeaderPageModule,
    BrMaskerModule
  ],
  declarations: [CompletedPage]
})
export class CompletedPageModule {}
