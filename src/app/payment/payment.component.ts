import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, FormGroupName} from '@angular/forms';
import {IPlan} from '../authentication/payment.model';
import {
  IPayPalConfig,
  ICreateOrderRequest 
} from 'ngx-paypal';
import { PlanService } from 'app/authentication/payment.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  public payPalConfig ? : IPayPalConfig;
  showSuccess: boolean;
  currentPlan: IPlan;
  public onAprooveMsg:String;
  firstFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder,
    private planService: PlanService, private router: Router) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
    });
    this.currentPlan= this.planService.getPlan();
    this.initConfig();
   
    //this.initConfig();
  }
  private initConfig(): void {
    this.payPalConfig = {
    currency: 'USD',
    clientId: 'sb',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: this.currentPlan.PLAN_VALUE.toString(),
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: this.currentPlan.PLAN_VALUE.toString(),
              }
            }
          },
          items: [
            {
              name: this.currentPlan.PLAN_NAME,
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'USD',
                value: this.currentPlan.PLAN_VALUE.toString(),
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
     this.onAprooveMsg = 'transaction is approved';
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then(details => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
     
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
  
    },
  };
  }

}
