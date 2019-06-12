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

@Component({
  selector: 'app-supplier-registration',
  templateUrl: './supplier-registration.component.html',
  styleUrls: ['./supplier-registration.component.scss']
})
export class SupplierRegistrationComponent implements OnInit {
    enableClose: Boolean = false;
    firstFormGroup:FormGroup;
    secondFormGroup: FormGroup;
    public filteredCountry: ReplaySubject<Array<any>> = new ReplaySubject<Array<any>>(1);
    public countryFilterCtrl: FormControl = new FormControl();
    vendorRequest: SavaVendorModel;
    // confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    confirmDialogRef: MatDialogRef<DialogComponent>;
    DialogRef: MatDialogRef<DialogComponent>;
    moddate: any;
 
 
    countries: Array<Object> = [{
        'CNT_NAME': 'Search',
        'CNT_PK':0
    }];
    keywordDataNull = {
        'CNT_NAME': '--Select--',
        
    }
    constructor(private apiService: ApiService,private vendorService: VendorService,private authService: AuthService,public _matDialog: MatDialog,  private _formBuilder: FormBuilder,private act_route: ActivatedRoute,private router: Router) { }
 
  ngOnInit(): void{
    this.firstFormGroup = this._formBuilder.group({
        txtCompany: [''],
        txtAddress: [''],
        txtCity: [''],
        txtPincode:[''],
        });
        this.secondFormGroup = this._formBuilder.group({
          ddlCountry: [''],
          txtMobile: ['',[Validators.pattern('^(?=.*[0-9])[- +()0-9]+$'),Validators.minLength(10),Validators.maxLength(12)]],
          txtEmail: ['', Validators.email],
          password: ['',Validators.minLength(6)],
            txtQIDText: ['']
            });
    
    this.countryFilterCtrl.valueChanges
    .subscribe(() => {
        this.filterSerach();
    });
    this.getCountry();
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
    // getCountry(selectedCountry)
    // const reqbody = {
    //     'AUTO_SEARCH': ''
    //  };
    //  console.log(reqbody);
    //  this.apiService.CountryFilterGetAuto(reqbody).subscribe((data: Array<object>) => {
    //     this.countries = data['Data'];
    //     console.log("Test->");
    //     console.log(this.countries);
    //     this.filteredCountry.next(this.countries);
       // this.secondFormGroup.controls.ddlCountry.setValue(curCountry['CNT_PK']);
        // if (selectedCountry != '') {
        //     this.secondFormGroup.controls.ddlCountry.setValue(5);
        //  }
    //     const curCountry={
    //         'CNT_NAME': 'QATAR',
    //         'CNT_PK':5
    //     }
    //     this.secondFormGroup = this._formBuilder.group({
    //         ddlCountry: [ curCountry['CNT_PK']]
    //       });
    //  });
    
    
    this.filteredCountry.next(this.countries.slice());
  }

  vendorSubmitbutton(): void {
    this.moddate =  new Date().toISOString();
    console.log("Test");
   console.log(this.secondFormGroup.value.ddlCountry);
    this.enableClose=true;
    this.vendorRequest = {
        'VND_NAME': this.firstFormGroup.value.txtCompany,
        'VND_ADDRESS1': this.firstFormGroup.value.txtAddress,
        'VND_PIN': this.firstFormGroup.value.txtPincode,
        'VND_TIN': this.secondFormGroup.value.txtQIDText,
        'VND_CITY': this.firstFormGroup.value.txtCity,
        'VND_COUNTRY': this.secondFormGroup.value.ddlCountry,
        'VND_MOBILE': this.secondFormGroup.value.txtMobile,
        'VND_EMAIL': this.secondFormGroup.value.txtEmail,
        
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
   

    this.vendorService.SaveVendor(this.vendorRequest).subscribe((data: Array<object>) => {
        if (data['Data'] > 0) {
            console.log(data['Data']);
            this.confirmDialogRef = this._matDialog.open(DialogComponent, {
                disableClose: true
            });
            this.confirmDialogRef.componentInstance.Message = 'Please check your email to validate and complete the vendor registration. Thank you.';
            // this.confirmDialogRef.componentInstance.confirmMessage = 'Thank you for submitting your requirment.You will be contacted soon, a copy of your requirment is shared in your email.';
          //  alert('Member is registered succesfully');
          
          this.confirmDialogRef.afterClosed().subscribe(result => {
            if ( result )
            {
                // this.router.navigate(['/home']);
            }
            this.confirmDialogRef = null;
        });
        }else {
            this.confirmDialogRef = this._matDialog.open(DialogComponent, {
                disableClose: true
            });
            this.confirmDialogRef.componentInstance.isError = true;
            if (data['Data'] === -1){
                this.confirmDialogRef.componentInstance.Message = 'Error Occured';
            }else if (data['Data'] === -2) {
                this.confirmDialogRef.componentInstance.Message = 'Already Exixts';
            }else if (data['Data'] === -3) {
                this.confirmDialogRef.componentInstance.Message = 'Another user modified this record';
            }else if (data['Data'] === 0) {
                this.confirmDialogRef.componentInstance.Message = 'Record Already Exixts';
            }
        }
        
     });

this.clearActivateForm();
}
clearActivateForm()
{
    this.firstFormGroup = this._formBuilder.group({
     
        txtCompany: '',
        txtAddress: '',
        txtCity: '',
        txtPincode:'',

       
        });
        this.secondFormGroup = this._formBuilder.group({
            ddlCountry: '',
            txtMobile:'',
            txtEmail: '',
            txtPassword: '',
            txtQIDText: '',
          
            });
    
}
// ngOnDestroy(): void
//     {
        
//         this.secondFormGroup = this._formBuilder.group({
     
//             txtMobile:['',[Validators.required,Validators.pattern('^(?=.*[0-9])[- +()0-9]+$'),Validators.minLength(10),Validators.maxLength(12)]],
//             txtEmail: ['', Validators.required],
//             txtPassword: ['', Validators.required,Validators.minLength(4)],
//             txtQIDText: ['']
//             });
//     }
}
