import { CommonFields } from './Interfaces';
import {Injectable, EventEmitter } from '@angular/core';
@Injectable({
    providedIn: 'root'
  })
export class SharedData 
{
    private _email: string='';
    private _OTP: string;
    private _IsValidOTP: boolean;


    public SetVendorEmail(val:string)
    {
        this._email=val;
    }
    public GetVendorEmail(){
        return this._email;
    }

    public IsValidOTP(val:string)
    {
        this._IsValidOTP=val==this._OTP;
        return this._IsValidOTP;
    }
    public ClearOTP()
    {
        this._OTP='';
    }
    public GetIsValidOTP(){
        return this._IsValidOTP;
    }
    public SetOTP(val:string)
    {
        this._OTP=val;
    }
    public GetOTP(){
        return this._OTP;
    }


    // public SetVendorEmail(val:string)
    // {
    //     sessionStorage.setItem('_email', val);
    // }
    // public GetVendorEmail(){
    //     return sessionStorage.getItem('_email');
    // }

}