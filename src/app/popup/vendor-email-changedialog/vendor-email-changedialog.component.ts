import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../authentication/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import {SharedData} from '../../services/common/SharedData.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, FormGroupName} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import {User} from '../../authentication/user.model';

import { VendorService } from '../../services/vendor/vendor.service';

@Component({
  selector: 'app-vendor-email-changedialog',
  templateUrl: './vendor-email-changedialog.component.html',
  styleUrls: ['./vendor-email-changedialog.component.scss']
})
export class VendorEmailChangedialogComponent implements OnInit {
  EmailChangeDialogRef: MatDialogRef<VendorEmailChangedialogComponent>;
  
 
  public MessageEmail: string;
  public isError: Boolean = false;
  public HideEmailPopup:boolean=true;
  HideEmailSuccessPopup:boolean=false;
  email: String;
  user: User;
  emailchange:String;
  firstFormGroup: FormGroup;
  public EmailErrorMsg:String;
  
  constructor(
      public EmailDialogRef: MatDialogRef<VendorEmailChangedialogComponent>,
      private router: Router,
      private activeRoute: ActivatedRoute,
      private sharedData: SharedData,
      public authService: AuthService,private _formBuilder: FormBuilder,public _matDialog: MatDialog,private vendorService: VendorService
  )
  {
  }

ngOnInit() {

  this.user= this.authService.getUserDetail();
  this.firstFormGroup = this._formBuilder.group({
    txtEmail: ['',[Validators.required, Validators.email,Validators.maxLength(50)] ],
    // txtcross1: ['',[Validators.required, Validators.email,Validators.maxLength(50)] ],
    });

}
get validation() { 
  return this.firstFormGroup.controls;
  }
  EmailNewChangeButton()
  {
    
   var reqObj={"VND_PK":this.user.VND_PK,
   "VND_NAME":this.user.VND_NAME,
   "VND_MAIL":this.firstFormGroup.value.txtEmail,
  };
  
  this.vendorService.ChangeVendorEmail(reqObj).subscribe((data: Array<object>) => {
    // this.keywordList = data['Data'];
    if (data['Data'] > 0) {
    this.HideEmailSuccessPopup=true;
    this.HideEmailPopup=false;
    this.MessageEmail = 'email changed successfully';
  }
  // else{
  //   alert("server error!")
  // }
  else {
    this.EmailChangeDialogRef = this._matDialog.open(VendorEmailChangedialogComponent, {
        disableClose: true
    });
    this.EmailChangeDialogRef.componentInstance.isError = true;
    if (data['Data'] === -1){
        this.EmailChangeDialogRef.componentInstance.MessageEmail = 'Error Occured';
    }
}
  });
  }
  EmailSuccessDialogRefClose()
  {
  this.EmailDialogRef.close(false);
    this.authService.logout();
   
  }
}
