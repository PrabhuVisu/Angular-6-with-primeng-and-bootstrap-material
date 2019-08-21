import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';



@Injectable()
export class AuthenticationService {
  loggedIn: boolean;
    constructor(private http: HttpClient,  private router: Router,
      ) { }

    login(username: any, password: any) {
        const formData: FormData = new FormData();
        formData.append('loginName', username);
        formData.append('password', password);
        console.log(username);
        console.log(password);
        const headers = new HttpHeaders()
        .set('Content-Type', 'text/xml')
        .append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS')
        .append('Access-Control-Allow-Origin', '*')
        .append('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method');
       return this.http.post<any>('https://dev.dwp.firstqa.com/server/user/api/v6.6/auth/login', formData, {responseType: 'text' as 'json'})
       .subscribe(data => {
         console.log(data.substring(data.indexOf('firstName')+47,data.indexOf('roleId')-101));
         localStorage.setItem("userName",data.substring(data.indexOf('firstName')+47,data.indexOf('roleId')-101));
         console.log("from localstorage = "+localStorage.getItem("userName"));
        console.log("Resultant Data = "+data);
        if (data.search('SD200') !== -1 ) {
          this.router.navigate(['./home']);
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
