import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { SkeltonHeaderPageModule } from '../../directives/skelton/skelton-header/skelton-header.module';
import { SkeltonListSinglePageModule } from '../../directives/skelton/skelton-list-single/skelton-list-single.module';

import { MyshiftsPage } from './myshifts.page';

const routes: Routes = [
  {
    path: '',
    component: MyshiftsPage,
    children: [
          {
            path: 'upcoming',
            loadChildren: './upcoming/upcoming.module#UpcomingPageModule'
          },
          {
            path: 'completed',
            loadChildren: './completed/completed.module#CompletedPageModule'
          },
          {
            path: '',
            redirectTo: 'upcoming',
            pathMatch: 'full'
          }
        ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SkeltonHeaderPageModule,
    SkeltonListSinglePageModule
  ],
  declarations: [MyshiftsPage]
})
export class MyshiftsPageModule {}
