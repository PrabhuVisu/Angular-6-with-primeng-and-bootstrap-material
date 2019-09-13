import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BsDatepickerModule } from 'ngx-bootstrap';
import { Ng2CompleterModule } from 'ng2-completer';
import { TagInputModule } from 'ngx-chips';
import {ButtonModule} from 'primeng/button';
import { SharedModule, PanelModule } from 'primeng/primeng';
import {TabViewModule} from 'primeng/tabview';

import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ChartModule } from 'primeng/chart';
import { MessagesComponent } from './messages/messages.component';
import { ActivityFeedComponent } from './activity-feed/activity-feed.component';
import { AboutComponent } from '../about/about.component';
import { AuthGuard } from '../shared';
import { CreatejobComponent } from '../createjob/createjob.component';
import { PendingtaskComponent } from '../pendingtask/pendingtask.component';
import { TaskdetailsComponent } from '../taskdetails/taskdetails.component';
import { JoblistComponent } from '../joblist/joblist.component';
import { UpdatejobComponent } from '../updatejob/updatejob.component';
import { TimesheetComponent } from '../timesheet/timesheet.component';
import { DynamoComponent } from '../dynamo/dynamo.component';
import { ProfileComponent } from '../profile/profile.component';



const homeRoute: Routes = [
  { path: 'home', component: HomeComponent ,  canActivate: [AuthGuard]},
  { path: 'login', loadChildren: '../login/login.module#LoginModule' },
  { path: 'about', component: AboutComponent },
  { path: 'createjob', component: CreatejobComponent },
  { path: 'dynamo', component: DynamoComponent },
  { path: 'pendingtask', component: PendingtaskComponent },
  { path: 'task/:id' , component: TaskdetailsComponent },
  { path: 'joblist', component: JoblistComponent },
  { path: 'updatejob', component: UpdatejobComponent },
  { path: 'timesheet', component: TimesheetComponent },
  {path: 'profiledata', component: ProfileComponent }
];

@NgModule({
  imports: [
    ChartModule,CommonModule,FormsModule,ReactiveFormsModule,SharedModule,PanelModule,TabViewModule,
   BsDatepickerModule.forRoot(),Ng2CompleterModule,TagInputModule,ButtonModule,
  	RouterModule.forRoot(homeRoute)
  ],
  exports: [RouterModule],
  declarations: [
    AboutComponent,
    HomeComponent,
    CreatejobComponent,DynamoComponent,ProfileComponent,
    MessagesComponent,
    ActivityFeedComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA ],
  providers: []
})

export class HomeRoutingModule { }