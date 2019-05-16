import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SkeltonListSinglePage } from './skelton-list-single.page';

const routes: Routes = [
  {
    path: 'skelton-list-single',
    component: SkeltonListSinglePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  exports:[SkeltonListSinglePage],
  declarations: [SkeltonListSinglePage]
})
export class SkeltonListSinglePageModule {}
