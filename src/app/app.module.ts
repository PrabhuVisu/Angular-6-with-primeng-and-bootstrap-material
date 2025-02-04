import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpModule, RequestOptions } from '@angular/http';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home/home.routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { AuthGuard } from './shared';
import { PendingtaskComponent } from './pendingtask/pendingtask.component';
import { TaskdetailsComponent } from './taskdetails/taskdetails.component';
import { JoblistComponent } from './joblist/joblist.component';
import { UpdatejobComponent } from './updatejob/updatejob.component';
import { TimesheetComponent } from './timesheet/timesheet.component';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    PendingtaskComponent,
    TaskdetailsComponent,JoblistComponent,UpdatejobComponent,TimesheetComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    TranslateModule.forRoot()
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
