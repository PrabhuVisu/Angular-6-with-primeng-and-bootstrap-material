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

  constructor(
      public router: Router,
      public authService: AuthenticationService
    ) {}

  ngOnInit() {}

  onLoggedin(username: any, password: any) {
    localStorage.setItem('isLoggedin', 'true');
  this.authService.login(username, password);
}

}
