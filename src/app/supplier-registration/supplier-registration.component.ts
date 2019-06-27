import { Component, OnInit , OnDestroy } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { ReplaySubject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
 import { locale as english } from 'app/navigation/i18n/en';
 import { locale as turkish } from 'app/navigation/i18n/tr';
 import { locale as arabic } from 'app/navigation/i18n/ar';
import { v4 as uuid } from 'uuid';
import { Router, ActivatedRoute } from '@angular/router';
import { MatRadioChange  } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/common/common.service';
import { VendorService } from '../services/vendor/vendor.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, FormGroupName} from '@angular/forms';
import {AuthService} from '../authentication/auth.service';
import {DialogComponent} from '../dialog/dialog.component';
import {ConstGroup} from '../utility/LocationConstants';
import {SerachGroup} from '../utility/SearchConstants';
import {SavaVendorModel} from '../business-object/VendorObject';
import { environment } from 'environments/environment';


@Component({
  selector: 'app-supplier-registration',
  templateUrl: './supplier-registration.component.html',
  styleUrls: ['./supplier-registration.component.scss']
})
export class SupplierRegistrationComponent implements OnInit,OnDestroy {
    enableClose: Boolean = false;
    public CountryCode: string;
    public EmailBind: string;
    public DefaultCountry: Number;
    firstFormGroup:FormGroup;
    secondFormGroup: FormGroup;
    public filteredCountry: ReplaySubject<Array<any>> = new ReplaySubject<Array<any>>(1);
    public countryFilterCtrl: FormControl = new FormControl();
    vendorRequest: SavaVendorModel;
    // confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    confirmDialogRef: MatDialogRef<DialogComponent>;
    DialogRef: MatDialogRef<DialogComponent>;
    moddate: any;
    default: string;
    mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$"; 
    countries: Array<Object> = [{
        'CNT_NAME': 'Search',
        'CNT_PK':0
    }];
    selectcountries: Array<Object> = [{
        
        'CNT_PK':0
    }];
    keywordDataNull = {
        'CNT_NAME': '--Select--',
        
    }
    constructor(private apiService: ApiService,private vendorService: VendorService,private authService: AuthService,public _matDialog: MatDialog,  private _formBuilder: FormBuilder,private act_route: ActivatedRoute,private router: Router) { }
 
  ngOnInit(): void{
    this. ConfigSettings();
    this.firstFormGroup = this._formBuilder.group({
        txtCompany: [''],
        txtAddress: [''],
        txtCity: [''],
        txtPincode:[''],
        });
        this.secondFormGroup = this._formBuilder.group({
          ddlCountry: ['', Validators.required],
          txtMobile: ['', [Validators.pattern(this.mobnumPattern),Validators.minLength(10),Validators.maxLength(12)]],
        //   txtMobile: ['',Validators.required,[Validators.pattern('^(?=.*[0-9])[- +()0-9]+$'),Validators.minLength(10),Validators.maxLength(12)]],
          txtEmail: ['', [Validators.email,Validators.maxLength(50)]],
          txtPassword: ['',[Validators.minLength(6),Validators.maxLength(20)]],
            txtQIDText: ['']
            });
            
    this.countryFilterCtrl.valueChanges
    .subscribe(() => {
        this.filterSerach();
    });
     this.getCountry();
    //  this.act_route.params.subscribe(params => {
    //  if (data['Data'] > 0) {
    //  {
    //     this.EmailBind = data["Data"][0].VND_EMAIL;    
    
    //  }
    //  })
  }
  button()
  {}
  private filterSerach(): void{
    let search = this.countryFilterCtrl.value;
    if (!search) {
        this.filteredCountry.next(this.countries.slice());
        return;
    } 
    else {
      search = search.toLowerCase();
    }
   
    const reqbody = {
        
        'AUTO_SEARCH': search
     };
     this.apiService.CountryFilterGetAuto(reqbody).subscribe((data: Array<object>) => {
        this.countries = data['Data'];
        console.log(this.countries );
        this.countries.splice(0,0,this.keywordDataNull);
        this.filteredCountry.next(this.countries);
     });

 }
 getCountry(): any {
    
    this.secondFormGroup.controls.ddlCountry.reset();
    this.filteredCountry.next([]);
    const reqbody = {
        'AUTO_SEARCH': ''
     };
     this.apiService.CountryFilterGetAuto(reqbody).subscribe((data: Array<object>) => {
        
        this.countries = data['Data'];
        this.countries.splice(0,0,this.keywordDataNull);
        this.filteredCountry.next(this.countries);
        this.secondFormGroup.controls.ddlCountry.setValue(environment.DefaultCountry);
     
     });
  }
  ConfigSettings()
  {
    this.CountryCode=environment.DefaultCountryCode;
    this.DefaultCountry=environment.DefaultCountry;
    //this.secondFormGroup.controls.ddlCountry.setValue(5);
    
    // const reqbody = {
    // //     'DEFAULT_COUNTRY':'',
    // //    ' DEFAULT_COUNTRY_CODE':''

    //  };
    // this.apiService.CountryFilterGetAuto(reqbody).subscribe((data: Array<object>) => {
    //     this.countries = data['Data'];
    //     this.filteredCountry.next(this.countries);
    //     // this.secondFormGroup.controls.ddlCountry.setValue(5);
    //  });
  }

  vendorSubmitbutton(): void {
    var selectedCntVal=this.secondFormGroup.value.ddlCountry;
    // var selectedCntArray=selectedCntVal.split(',');
    this.moddate =  new Date().toISOString();
    console.log("Test");
    console.log(this.secondFormGroup.value.ddlCountry);
    this.enableClose=false;
    this.vendorRequest = {
        'VND_NAME': this.firstFormGroup.value.txtCompany,
        'VND_ADDRESS1': this.firstFormGroup.value.txtAddress,
        'VND_PIN': this.firstFormGroup.value.txtPincode,
        'VND_TIN': this.secondFormGroup.value.txtQIDText,
        'VND_CITY': this.firstFormGroup.value.txtCity,
        'VND_COUNTRY':  this.secondFormGroup.value.ddlCountry, // selectedCntArray[0], 
        'VND_MOBILE': this.secondFormGroup.value.txtMobile,
        'VND_EMAIL': this.secondFormGroup.value.txtEmail,
        'VUT_PASSWORD':this.secondFormGroup.value.txtPassword,
        
//No entries
        // 'VND_CODE':'', 
        'VND_ADDRESS2':'',
        'VND_ADDRESS3':'',
        'VND_PHONE':'',
        'VND_FAX':'',
        'VND_PK': 0,
        'VND_MOD_DT':  this.moddate,
        'VND_CRTD_DT':this.moddate,
        'VND_CURRENCY':1,
        'VND_WEBSITE':'',
        'VND_STATUS':1,
        'VND_ACTIVE':0,
        'VND_BIZUNIT':1,
        'VND_CRTD_BY':1,
        'VND_MOD_BY':1

    };
    console.log(this.vendorRequest);
    this.vendorService.SaveVendor(this.vendorRequest).subscribe((data: Array<object>) => {
        if (data['Data'] > 0) {
            
            this.confirmDialogRef = this._matDialog.open(DialogComponent, {
                disableClose: true
            });
            var msg='thank for submitting vendor registration at  <a routerLink="http://need.qa/#/home"> www.need.qa </a>. a verification email has been sent to your email. kindly check your email and activate your account. ';
        //    this.confirmDialogRef.componentInstance.isError=false;
          
          this.confirmDialogRef.componentInstance.Message = msg;
     
          this.confirmDialogRef.afterClosed().subscribe(result => {
            if ( result )
            {
              
            }
            this.confirmDialogRef = null;
            this.ReSetForm();
            this.router.navigate(['/login']);
        });
        }else {
            this.confirmDialogRef = this._matDialog.open(DialogComponent, {
                disableClose: true
            });
            this.confirmDialogRef.componentInstance.isError = true;
            if (data['Data'] === -1){
                this.confirmDialogRef.componentInstance.Message = 'error occured';
            }else if (data['Data'] === -2) {
                this.confirmDialogRef.componentInstance.Message = 'already exixts';
            }else if (data['Data'] === -3) {
                this.confirmDialogRef.componentInstance.Message = 'Another user modified this record';
            }else if (data['Data'] === 0) {
                this.confirmDialogRef.componentInstance.Message = 'Record Already Exixts';
            }
            else if (data['Data'] === -11) {
                this.confirmDialogRef.componentInstance.Message = 'this email id already registered';
            }
        }
        
     });


}

ReSetForm()
{
 
    this.firstFormGroup = this._formBuilder.group({
        txtCompany: '',
        txtAddress: '',
        txtCity: '',
        txtPincode:'',
        });
    this.secondFormGroup = this._formBuilder.group({
        txtMobile:'',
        txtEmail: '',
        txtPassword: '',
        txtQIDText: '',
        ddlCountry:'',
        });
    this.getCountry();
  }
ngOnDestroy(): void
    {
        
        this.firstFormGroup = this._formBuilder.group({
            txtCompany: [''],
            txtAddress: [''],
            txtCity: [''],
            txtPincode:[''],
            });
            this.secondFormGroup = this._formBuilder.group({
              ddlCountry: ['', Validators.required],
              txtMobile: ['',[Validators.pattern('^(?=.*[0-9])[- +()0-9]+$'),Validators.minLength(10),Validators.maxLength(12)]],
              txtEmail: ['', Validators.email],
              txtPassword: ['',Validators.minLength(6)],
                txtQIDText: ['']
                });
    }
    onCountrySelect()
    {
        var selected=this.secondFormGroup.value.ddlCountry;
        // var selectedArray=selected.split(',');
       // this.secondFormGroup.value.lblPhcode=selectedArray[1];
        
        const reqbody = {
            'CNT_PK':selected 
         };
         this.apiService.SelectCountry(reqbody).subscribe((data: Array<object>) => {
            this.CountryCode = data["Data"][0].CNT_PHONE_CODE; 
         });

    }
    get f() { return this.secondFormGroup.controls; }
    get txtMobile() {
        return this.secondFormGroup.get('txtMobile');
     }  
     numericOnly(event): boolean {    
        let patt = /^([0-9])$/;
        let result = patt.test(event.key);
        return result;
    } 
}
