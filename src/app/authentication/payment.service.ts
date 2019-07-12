import { Injectable, EventEmitter } from '@angular/core';

import { Subject } from 'rxjs/subject';
import { Observable, ReplaySubject } from 'rxjs';
// import { getMatIconFailedToSanitizeUrlError } from '@angular/material';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalUrl } from '../utility/GlobalUrl';
import { environment } from 'environments/environment';
import { IPlan } from '../authentication/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private plan: IPlan;
  constructor(private router: Router) { }
  public getPlan() {
    return this.plan;
  }
  //    public setPlan(val:IPlan): void{
  //        this.plan.next({"PLAN_ID": val.PLAN_ID, "PLAN_VALUE": val.PLAN_VALUE, "PLAN_NAME": val.PLAN_NAME});
  //    }

  public setPlan(val: IPlan) {
    return new Promise((resolve, reject) => {
      this.plan = { "PLAN_ID": val.PLAN_ID, "PLAN_VALUE": val.PLAN_VALUE, "PLAN_NAME": val.PLAN_NAME };
      resolve('done');
    });
  }
}
