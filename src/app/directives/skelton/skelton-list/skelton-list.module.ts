import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SkeltonListPage } from './skelton-list.page';

const routes: Routes = [
  {
    path: 'skelton-list',
    component: SkeltonListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  exports:[SkeltonListPage],
  declarations: [SkeltonListPage]
})
export class SkeltonListPageModule {}
