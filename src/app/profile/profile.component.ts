import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../router.animations';
import { FormGroup, FormBuilder } from '@angular/forms';
//import { NgxFileDropEntry, FileSystemDirectoryEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { AuthenticationService } from 'src/app/service/auth.service';

@Component({
    selector: 'app-profile',
    providers: [AuthenticationService],
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    animations: [routerTransition()]
})
export class ProfileComponent implements OnInit {
  submitted = false;
  //public files: NgxFileDropEntry[] = [];
   parsedData: any;
  loggedInData = [];
  profileData: any;
  data = [];

   constructor(public fb: FormBuilder, public authService: AuthenticationService) {
this.getLoggedInUser();
    }
   ngOnInit() {

   }
getLoggedInUser() {
  this.authService.login (localStorage.getItem('username'), localStorage.getItem('password')).subscribe(data1 => {
      this.parsedData = JSON.parse(data1);
      console.log(this.parsedData);
      this.getProfileData();
      this.data.push({'loggedIndata': this.parsedData['Items'][0]});
  });
}
getProfileData() {
this.authService.getProfileInfo().subscribe(data2 => {
    const t = JSON.parse(data2);
    this.data.push({ 'profileData': t['Items'][0]});
    console.log(this.data);
    });
}


}