import { Component, OnInit,OnDestroy } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { ReplaySubject } from 'rxjs';
import { map, catchError,startWith } from 'rxjs/operators'
import { MatDialog, MatDialogRef } from '@angular/material';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
 import { locale as english } from 'app/navigation/i18n/en';
 import { locale as turkish } from 'app/navigation/i18n/tr';
 import { locale as arabic } from 'app/navigation/i18n/ar';
import { v4 as uuid } from 'uuid';
import { Router, ActivatedRoute } from '@angular/router';
import { MatRadioChange  } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/common/common.service';
import { EnquiryService } from '../../services/enquiry/enquiry.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, FormGroupName} from '@angular/forms';
import {AuthService} from '../../authentication/auth.service';
import {DialogComponent} from '../../dialog/dialog.component';
import {ConstGroup} from '../../utility/LocationConstants';
import {SerachGroup} from '../../utility/SearchConstants';
import {SavaEnquiryModel} from '../../business-object/EnquiryObject';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-validators',
  templateUrl: './validators.component.html',
  styleUrls: ['./validators.component.scss']
})
export class ValidatorsComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private apiService: ApiService,private enquiryService: EnquiryService,private authService: AuthService,public _matDialog: MatDialog,  private _formBuilder: FormBuilder,private act_route: ActivatedRoute,private router: Router) { }
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$"; 
  pwdPattern = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$";
  ngOnInit() {
    
      this.registerForm = this._formBuilder.group({
          // firstName: ['', Validators.required],
          txtMobile: ['', Validators.pattern(this.mobnumPattern)],
          txtEmail: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.pattern(this.pwdPattern)]],
          // password: ['', [Validators.required, Validators.minLength(6)]]
          
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }


  get txtMobile() {
    return this.registerForm.get('txtMobile');
 }    
 get password() {
  return this.registerForm.get('password');
}  
}
