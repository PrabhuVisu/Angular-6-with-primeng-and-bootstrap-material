import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BsDatepickerModule } from 'ngx-bootstrap';
import { Ng2CompleterModule } from 'ng2-completer';
import { TagInputModule } from 'ngx-chips';
import {ButtonModule} from 'primeng/button';

import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ChartModule } from 'primeng/chart';
import { MessagesComponent } from './messages/messages.component';
import { ActivityFeedComponent } from './activity-feed/activity-feed.component';
import { AboutComponent } from '../about/about.component';
import { AuthGuard } from '../shared';
import { CreatejobComponent } from '../createjob/createjob.component';

const homeRoute: Routes = [
  { path: 'login', loadChildren: '../login/login.module#LoginModule' },
  	{ path: 'home', component: HomeComponent ,  canActivate: [AuthGuard]},
    { path: 'about', component: AboutComponent },
    { path: 'createjob', component: CreatejobComponent },
];

@NgModule({
  imports: [
    ChartModule,CommonModule,FormsModule,ReactiveFormsModule,
   BsDatepickerModule.forRoot(),Ng2CompleterModule,TagInputModule,ButtonModule,
  	RouterModule.forRoot(homeRoute)
  ],
  exports: [RouterModule],
  declarations: [
    AboutComponent,
    HomeComponent,
    CreatejobComponent,
    MessagesComponent,
    ActivityFeedComponent
  ],
  providers: []
})

export class HomeRoutingModule { }