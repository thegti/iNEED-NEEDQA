import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { fromEvent } from 'rxjs';
import {MatAccordion} from '@angular/material/expansion';
import { v4 as uuid } from 'uuid';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, FormGroupName, FormGroupDirective, NgForm, ValidatorFn} from '@angular/forms';
import {VendorKeywordModel} from '../business-object/VendorObject';

import {VendorGetModel} from '../business-object/VendorObject';
import { VendorService } from '../services/vendor/vendor.service';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import {User} from '../authentication/user.model';
import {AuthService} from '../authentication/auth.service';
import { debug } from 'util';
import {VendorSalesLeadModel} from '../business-object/VendorObject';
import { SerachGroup } from 'app/utility/SalesLoadUse';
import {SalesProductGroup} from 'app/utility/SalesProducts';
import {SalesValueGroup} from 'app/utility/SalesValue';
import {VendorsavedialogComponent} from '../popup/vendorsavedialog/vendorsavedialog.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ErrorStateMatcher } from '@angular/material';
import {customValidationService} from './customValidationService'
// import '../js/sidebarclose.js';

export const errorMessages: { [key: string]: string } = {
  fullName: 'Full name must be between 1 and 128 characters',
  email: 'Email must be a valid email address (username@domain)',
  confirmEmail: 'Email addresses must match',
  password: 'Password must be between 7 and 15 characters, and contain at least one number and special character',
  confirmPassword: 'Passwords must match'
};
export class CSVRecord {

  public firstName: any;
  public lastName: any;
  public email: any;
  public phoneNumber: any;
  public title: any;
  public occupation: any;
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})

  export class TestComponent   {
    constructor(){}
    ngOnInit() {
      // this.GetSidebarOpen();
    }
    // GetSidebarOpen() {
    //   var element = document.querySelector(".page-layout1");
    //   document.body.style.background = "039be5";
    //   document.body.style.color = "#fff";
  
    //   var _gaq = _gaq || [];
    //   _gaq.push(['_setAccount', 'UA-36251023-1']);
    //   _gaq.push(['_setDomainName', 'jqueryscript.net']);
    //   _gaq.push(['_trackPageview']);
      
    //   (function() {
    //   var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    //   ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    //   var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    //   })();
  
  
  
    // }
   
  }