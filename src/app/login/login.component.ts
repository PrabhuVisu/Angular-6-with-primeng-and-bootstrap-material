import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthenticationService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  providers: [AuthenticationService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
  
  parsedData: any;
    
  constructor(
      public router: Router,
      public authService: AuthenticationService
    ) {}

  ngOnInit() {}

  onLoggedin(username: any, password: any) {
    localStorage.setItem('isLoggedin', 'true');
    this.authService.login(username, password).subscribe(data => {
      console.log(JSON.parse(data));
      this.parsedData = JSON.parse(data);
      localStorage.setItem("userName",this.parsedData['Items'][0].firstName);
      if (data.search('SD200') !== -1 ) {
      localStorage.setItem('isLoggedin', 'true');
      localStorage.setItem('LoginData',data);
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      this.router.navigate(['/home']);
      } else if (data.search('SD205') !== -1) {
      console.log('Login name or password is wrong');
      } else if (data.search('SD394') !== -1) {
      console.log('User Account Locked');
      } else if (data.search('SD401') !== -1) {
      console.log('Not Authorized');
      } else {
      console.log('User Blocked');
      }
      });

  }
}
