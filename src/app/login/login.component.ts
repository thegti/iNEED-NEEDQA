import { Component, OnInit,ViewChildren,Input,ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonFields } from '../services/common/Interfaces';
import {SharedData} from '../services/common/SharedData.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

   email: string;
    loginform: FormGroup;
  constructor(private _formBuilder: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private sharedData: SharedData,) { }
    private IsDisableUserName: boolean=false;
  ngOnInit() {
    this.loginform = this._formBuilder.group({
      txtUsername: ['',[Validators.required, Validators.email,Validators.maxLength(50)] ],
      txtPassword: ['',[Validators.minLength(6),Validators.maxLength(20)]],
    
    });
   
    this.email=this.sharedData.GetVendorEmail();
    // this.loginform.value.txtUsername=this.email;

    if(this.email==undefined){
      this.email='';
      // this.IsDisableUserName=false;
      // this.loginform = this._formBuilder.group({
      //   txtUsername: ['',[Validators.required, Validators.email] ],
      //   txtPassword: ['',Validators.minLength(6)],
      // });
      // this.loginform = this._formBuilder.group({
      //   name: ({ value: '', disabled: this.IsDisableUserName })
      // });

    }
    else
    {
      this.loginform.value.txtUsername=this.email;
      // this.IsDisableUserName=true;
      // this.loginform = this._formBuilder.group({
      //   txtUsername: ['',[Validators.required, Validators.email] ],
      //   txtPassword: ['',Validators.minLength(6)],
      // });
      this.loginform.controls.txtUsername.disable();
    
    }
  }
  button()
  {}
  get validation() { 
    return this.loginform.controls;
    }
}
