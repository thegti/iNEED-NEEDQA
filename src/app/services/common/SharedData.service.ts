import { CommonFields } from './Interfaces';
import {Injectable, EventEmitter } from '@angular/core';
@Injectable({
    providedIn: 'root'
  })
export class SharedData 
{
    private _email: string;

    public SetVendorEmail(val:string)
    {
        this._email=val;
    }
    public GetVendorEmail(){
        return this._email;
    }

    // public SetVendorEmail(val:string)
    // {
    //     sessionStorage.setItem('_email', val);
    // }
    // public GetVendorEmail(){
    //     return sessionStorage.getItem('_email');
    // }

}