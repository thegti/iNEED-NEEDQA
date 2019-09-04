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
import {customValidationService} from './customValidationService';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
// import '../js/sidebarclose.js';

// export const errorMessages: { [key: string]: string } = {
//   fullName: 'Full name must be between 1 and 128 characters',
//   email: 'Email must be a valid email address (username@domain)',
//   confirmEmail: 'Email addresses must match',
//   password: 'Password must be between 7 and 15 characters, and contain at least one number and special character',
//   confirmPassword: 'Passwords must match'
// };
// export class CSVRecord {

//   public firstName: any;
//   public lastName: any;
//   public email: any;
//   public phoneNumber: any;
//   public title: any;
//   public occupation: any;
// }
export interface State {
  flag: string;
  name: string;
  population: string;
}
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})

  export class TestComponent   {
    // constructor(){}
    // ngOnInit() {
    //   // this.GetSidebarOpen();
    // }
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
    stateCtrl = new FormControl();
  filteredStates: Observable<State[]>;

  states: State[] = [
    {
      name: 'Arkansas',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      name: 'California',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      name: 'Florida',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      name: 'Texas',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    }
  ];

  constructor() {
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.states.slice())
      );
  }

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }
}
  