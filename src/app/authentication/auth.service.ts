import {Injectable, EventEmitter } from '@angular/core';

import {Subject} from 'rxjs/subject';
import { Observable } from 'rxjs';
// import { getMatIconFailedToSanitizeUrlError } from '@angular/material';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {GlobalUrl} from '../utility/GlobalUrl';
import { environment } from 'environments/environment';
@Injectable({
    providedIn: 'root'
  }) 
export class AuthService
{
  countryID: any;
  redirectUrl: string;
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
 
 


 
  public get getToken(): any{
       return sessionStorage.getItem('token'); 
    }

}
