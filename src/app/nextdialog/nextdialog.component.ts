import { Component, OnInit ,Input,EventEmitter} from '@angular/core';
import { MatDialogRef } from '@angular/material';
import {SharedData} from '../services/common/SharedData.service'
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, FormGroupName} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nextdialog',
  templateUrl: './nextdialog.component.html',
  styleUrls: ['./nextdialog.component.scss']
})
export class NextdialogComponent implements OnInit {
  firstFormGroup: FormGroup;
  public Message: string;
  public AttemptOtpMessage:string;
  public InvalidOtpMessage:string;
  private attemptCount: number;
  private maxAttemptCount: number;
  public isError: Boolean = false;
  onAdd = new EventEmitter();
  constructor(
      public NextDialogRef: MatDialogRef<NextdialogComponent>,private sharedData:SharedData,
      private _formBuilder: FormBuilder,private act_route: ActivatedRoute,  )  {
        this.maxAttemptCount=3;
        this.attemptCount=1;
      }
  verifyOtp()
  {
    
  }
 
ngOnInit() {
  this.firstFormGroup = this._formBuilder.group({
    // captcha: ['', Validators.required],
    lblOtp: [''],
    
    });
}
onButtonClicked()
{
  
  if(this.attemptCount++>=this.maxAttemptCount)
  {
    this.sharedData.ClearOTP();
    this.AttemptOtpMessage="attempt limit exceeded!";
    
  }
  else if(this.sharedData.IsValidOTP(this.firstFormGroup.value.lblOtp))
    {
        this.NextDialogRef.close('submit');
    }
    else
    {
      this.InvalidOtpMessage="invalid otp!"
      
    }
}

}
