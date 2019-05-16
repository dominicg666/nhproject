import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SkeltonListSinglePageModule } from '../../directives/skelton/skelton-list-single/skelton-list-single.module';
import { IonicModule } from '@ionic/angular';

import { HelpPage } from './help.page';

const routes: Routes = [
  {
    path: '',
    component: HelpPage
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
  declarations: [HelpPage]
})
export class HelpPageModule {}
