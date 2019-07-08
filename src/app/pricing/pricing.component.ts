import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, FormGroupName} from '@angular/forms';
import {VendorService} from '../services/vendor/vendor.service';
import { PlanGetModel } from 'app/business-object/VendorObject';
import { PlanService } from 'app/authentication/payment.service';
import {IPlan} from '../authentication/payment.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  firstFormGroup: FormGroup;
  curPlan: IPlan;

  secondFormGroup: FormGroup;
  public plans: PlanGetModel [];
  constructor(private _formBuilder: FormBuilder,private vendorService: VendorService
      ,private planService: PlanService, private router: Router) { }
  ngOnInit() {
    // this.firstFormGroup = this._formBuilder.group({
    // });
    this.PlanGet();
  }
  PayementButton(index: number)
  {

    // console.log("->",this.plans);
    // console.log(this.plans[index].PLN_PK);
    // console.log(this.curPlan);

  
    this.curPlan={
        "PLAN_NAME": this.plans[index].PLN_NAME,
        "PLAN_ID": this.plans[index].PLN_PK,
        "PLAN_VALUE": this.plans[index].DISPLAY_RATE};
        
    // this.planService.setPlan(this.curPlan);
    // this.router.navigate(['/payment/']);


    
    this.planService.setPlan(this.curPlan).then(()=>{
      this.router.navigate(['/payment/']);
    });

  }

  PlanGet()
  {
    var reqbody = {
     'USER_PK':1
   };
 
   this.vendorService.PlanGet(reqbody).subscribe((data: Array<object>) => {
      this.plans = data['Data'];
      
   });
  }
}
