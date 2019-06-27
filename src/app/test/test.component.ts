import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
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
import {VendorsavedialogComponent} from '../vendorsavedialog/vendorsavedialog.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ErrorStateMatcher } from '@angular/material';
import {customValidationService} from './customValidationService'

export const errorMessages: { [key: string]: string } = {
  fullName: 'Full name must be between 1 and 128 characters',
  email: 'Email must be a valid email address (username@domain)',
  confirmEmail: 'Email addresses must match',
  password: 'Password must be between 7 and 15 characters, and contain at least one number and special character',
  confirmPassword: 'Passwords must match'
};

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})


  

  
  export class TestComponent implements OnInit {
    @ViewChild('search') searchElement: ElementRef;

  displayedColumns: string[] = ['checkbox','VKW_KWORD','Edit'];
  dataSource: MatTableDataSource<VendorKeywordModel>;
  keywordList: VendorKeywordModel[]=[]; 
  VendorGetList : VendorGetModel[]=[];
  VendorSalesSaveList : VendorSalesLeadModel[]=[];
  tempObject: VendorKeywordModel;
  tempAddObject: VendorKeywordModel;
  editKeywordObject : VendorKeywordModel;
  VendortempObject : VendorKeywordModel;
  salesLeadTempObject : VendorKeywordModel;
  salesLeadSaveTempObject : VendorSalesLeadModel;
  salesLeadList : VendorSalesLeadModel;
  private IsEditSalesLead: boolean =false;
  firstFormGroup: FormGroup;
  public selectedSalesUse:any;
  public valueSalesUse:any;
  public productSalesUse:any;
  public keywordErrorMsg:String;
 // vendorkeywords: Array<VendorKeywordModel> = [];
  public selectedItem='item1';
  private IsEditRow:boolean=false;
  public selectedKeywordItem='selectedkeyword1';
  IsHideUploadDiv:Boolean=true;
  selectedfile: File;
  imgname: any = '';
  imgChange: Boolean = false;
  formdt: FormData = new FormData();
  filenames:Boolean=true;  
  url = '../../assets/loginasset/images/display-img.jpg';
  // @ViewChild(MatAccordion) accordion: MatAccordion;
  panelOpenState = false;
  user: User;
   VendorRegistrationId:String;
  VendorRegistrationName : String;
  VendorAddress : String;
  VendorPin : String;
  VendorCity : String;
  VendorCountry : String;
  VendorMob : String;
  VendorCrn: String;
  VendorEmail : String;
  VendorStatus : String;
  VendorExpiry : String;
  VendorPlan : String;
  moddate: any;
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$"; 
  numpattern = "^[1-9][2-9](?!00$)[0-9][1-9]?\d+$"; 
  IsPersonalUse: boolean =true;
  IsBusinessUse: boolean;
  IsBoth: boolean;
  IsProductType: boolean =true;
  IsServiceType: boolean;
  IsBothType : boolean;
  IsValueType : boolean =true;
  IsGreaterValueType : boolean;
  private LanguageType: number=1;
  errors = errorMessages;
  public ValueTxtValue:boolean=false;
  // IsHideTxtValue:boolean=false;
VendorSaveDialogRef: MatDialogRef<VendorsavedialogComponent>;
  VendorDialogRef: MatDialogRef<VendorsavedialogComponent>;
  constructor(private _formBuilder: FormBuilder,private vendorService: VendorService,
    private authService: AuthService,public _matDialog: MatDialog, ) {
    
   }
  //  account_validation_messages = {
 
  //   'txtEmail': [
  //     { type: 'required', message: 'Email is required' },
  //     { type: 'pattern', message: 'Enter a valid email' }
  //   ],
  
  //   }

  ngOnInit() {
this.ResetFormControls(true);

    
   
   
    
  }
  ResetFormControls(IsNew:boolean)
  {
  this.firstFormGroup = this._formBuilder.group({
  
  
    txtValue : ['', [Validators.required, Validators.pattern(this.numpattern)]],
    
    });
  }


  get formControls() { return this.firstFormGroup.controls; }
  sidebarMenu(item)
  {
    this.selectedItem=item;
    console.log(this.selectedItem);

  }

}
