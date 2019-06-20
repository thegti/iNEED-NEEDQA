import {Injectable, EventEmitter } from '@angular/core';

import {Subject} from 'rxjs/subject';
import { Observable } from 'rxjs';
// import { getMatIconFailedToSanitizeUrlError } from '@angular/material';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {GlobalUrl} from '../utility/GlobalUrl';
import { environment } from 'environments/environment';
import {User} from '../authentication/user.model';


@Injectable({
    providedIn: 'root'
  }) 
export class AuthService
{
  header = { headers: { Authorization: `Bearer ${this.getToken}` } };
  countryID: any;
  redirectUrl: string;
  private user: User;
  loginStatus: EventEmitter<boolean> = new EventEmitter<boolean>();
  authChange = new Subject<boolean>();

  baseUrl = environment.baseUrl;
  constructor(
    private GlobalUrls: GlobalUrl,
    private httpClient: HttpClient,  
    private router: Router){}


public GetHeader(): any
{
if ( !!sessionStorage.getItem('token')) {
    return { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } };
}
else{ return {};
}

}
 
VendorLoginVendor(req):any{
  return this.httpClient.post<User>(`${this.baseUrl}api/Vendor/LoginVendor`, req, this.header);
}
public manageSession(data: User): void {
  sessionStorage.setItem('token', data['Token']);
 // sessionStorage.setItem('refresh', data.refresh_token);
  sessionStorage.setItem('user', JSON.stringify(data));
}

getUser(): User
{
  return this.user;
}
 
public getUserDetail(): any {     
  if (sessionStorage.getItem('user')) {
    this.user=<User>JSON.parse(sessionStorage.getItem('user'));
    return  this.user[0];
  } else {
    return null;
  }
}

public get isLoggedIn(): Boolean { 
    return !!sessionStorage.getItem('token'); 
  }  
public get getToken(): any{
     return sessionStorage.getItem('token'); 
  }
public logout(): void {
  this.redirectUrl = document.location.pathname;
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('refresh');
  sessionStorage.removeItem('user');
  this.router.navigate(['']);
  this.loginStatus.emit(false);
}

}
