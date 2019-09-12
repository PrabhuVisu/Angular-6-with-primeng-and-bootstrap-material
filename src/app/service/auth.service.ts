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
          // tslint:disable-next-line:max-line-length
          .append('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method');
        // tslint:disable-next-line:max-line-length
        return this.http.post<any>('https://dev.dwp.firstqa.com/server/user/api/v6.6/auth/login.json', formData, { withCredentials: true, responseType: 'text' as 'json' });
      }
      getProfileInfo() {
        // tslint:disable-next-line:max-line-length
        return this.http.get<any>('https://dev.dwp.firstqa.com/server/common/api/v6.6/userProfile/get.json', { withCredentials: true, responseType: 'text' as 'json' });
      }
    
    }
    
    