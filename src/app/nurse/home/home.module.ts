import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { SkeltonHeaderPageModule } from '../../directives/skelton/skelton-header/skelton-header.module';
import { SkeltonListPageModule } from '../../directives/skelton/skelton-list/skelton-list.module';


const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SkeltonListPageModule,
    SkeltonHeaderPageModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
