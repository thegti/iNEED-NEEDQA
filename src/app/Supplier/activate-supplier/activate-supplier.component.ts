import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, FormGroupName} from '@angular/forms';
import { CommonFields } from '../../services/common/Interfaces';
import { Router, ActivatedRoute } from '@angular/router';
import { VendorService } from '../../services/vendor/vendor.service';
import {SharedData} from '../../services/common/SharedData.service'

@Component({
  selector: 'app-activate-supplier',
  templateUrl: './activate-supplier.component.html',
  styleUrls: ['./activate-supplier.component.scss']
})
export class ActivateSupplierComponent implements OnInit {
  private key: string;
  public lblMessage:string;
  private commonFields: CommonFields;
  firstFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private sharedData: SharedData,
    
    private vendorService: VendorService,) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.key = params['key'];
      const reqbody = {
        'KEY':this.key 
     };
     console.log(reqbody);
     this.vendorService.ActivateVendor(reqbody).subscribe((data: Array<object>) => {
      console.log('account');
       console.log(data);
      if (data['Data'] === -8){
        this.lblMessage="your account is already activated!";
      }
      else{
        this.sharedData.SetVendorEmail(data["Data"][0].VND_EMAIL);
        this.lblMessage="your account is activated!";
      }
    
     });

    });
  
    // this.firstFormGroup.value.lblActivateMsg="test";
this.lblMessage="test";

  }
  

}
