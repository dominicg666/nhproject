import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../home/home.module#HomePageModule'
          },
          {
            path: 'detail/:jobid',
            loadChildren: '../home-detail/home-detail.module#HomeDetailPageModule'
          }
        ]
      },
      {
        path: 'notification',
        loadChildren: '../notification/notification.module#NotificationPageModule'
      },
      {
        path: 'payment-history',
        loadChildren: '../payment-history/payment-history.module#PaymentHistoryPageModule'        

      },
      { path: 'refer-a-friend', loadChildren: '../refer-a-friend/refer-a-friend.module#ReferAFriendPageModule' },
      { path: 'help', loadChildren: '../help/help.module#HelpPageModule' },
      {
        path: 'myshifts',
        loadChildren: '../myshifts/myshifts.module#MyshiftsPageModule'
        // children: [
        //   {
        //     path: 'upcoming',
        //     loadChildren: '../myshifts/upcoming/upcoming.module#UpcomingPageModule'
        //   },
        //   {
        //     path: 'completed',
        //     loadChildren: '../myshifts/completed/completed.module#CompletedPageModule'
        //   },
        //   {
        //     path: 'notification',
        //     loadChildren: '../notification/notification.module#NotificationPageModule'
        //   }
        // ]
      },
      {
        path: 'myshifts/upcoming/details/:jobid',
        loadChildren: '../myshifts/upcoming-shift-details/upcoming-shift-details.module#UpcomingShiftDetailsPageModule'
      },
      {
        path: 'inbox',
        children: [
          {
            path: '',
            loadChildren: '../inbox/inbox.module#InboxPageModule'
          },
          {
            path: 'chat/:chatwithid',
            loadChildren: '../chat/chat.module#ChatPageModule'
          }
        ]
      },
      {
        path: 'profile',
        loadChildren: '../profile/profile.module#ProfilePageModule',
        children: [
          {
            path: '',
            loadChildren: '../profile/profile.module#ProfilePageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/register',
        pathMatch: 'full'
      }
    ]
  },
  // {
  //   path: 'register',
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: '../register/register.module#RegisterPageModule'
  //     }
  //   ]
  // },
  {
    path: '',
    redirectTo: '/nurse/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
