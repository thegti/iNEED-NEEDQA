import { Component, OnInit,ViewChildren,Input,ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonFields } from '../services/common/Interfaces';
import {SharedData} from '../services/common/SharedData.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../authentication/auth.service';
import { userInfo } from 'os';
import { User } from '../authentication/user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

   private user: User;
   email: string;
    loginform: FormGroup;
    public LoginErrorMsg:String;
  constructor(private _formBuilder: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private sharedData: SharedData,
    private authService: AuthService,) { }
    private IsDisableUserName: boolean=false;
  ngOnInit() {
    this.email=this.sharedData.GetVendorEmail();
    // this.loginform.value.txtUsername=this.email;
    if(this.email==undefined || this.email==''){
      this.email='';
      this.loginform = this._formBuilder.group({
        txtUsername: ['',[Validators.required, Validators.email,Validators.maxLength(50)] ],
        txtPassword: ['',[Validators.minLength(6),Validators.maxLength(20)]],
      
      });
    }
    else
    {
      // this.IsDisableUserName=true;
      this.loginform = this._formBuilder.group({
        txtUsername: [this.email,[Validators.required, Validators.email] ],
        txtPassword: ['',[Validators.required,Validators.minLength(6)]],
      });
    }
  }
  LoginSignIn()
  {
    const reqbody = {
        
      'USR_NAME': this.loginform.value.txtUsername,
      'USR_PWD' : this.loginform.value.txtPassword
   };
   
    this.authService.VendorLoginVendor(reqbody).subscribe(res => {
   
        if(res['Data'] == -1)
        {
          this.LoginErrorMsg="invalid username or password";
        }
        else{
          this.authService.manageSession(res['Data']);
          this.authService.loginStatus.emit(true);
          this.user=res['Data'][0];
          this.sharedData.SetLoginVendor(this.user.VND_PK);
          this.router.navigate(['/vendorprofile' ] );
        }
    },
    error => {
      this.LoginErrorMsg = "internal server error!";
    });
  }
  get validation() { 
    return this.loginform.controls;
    }
}
