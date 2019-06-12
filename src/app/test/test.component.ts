import { Component, OnInit , OnDestroy ,ViewChild} from '@angular/core';
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
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
    selected: number;
    secondFormGroup: FormGroup;
    firstFormGroup:FormGroup;
    public filteredCount: ReplaySubject<Array<any>> = new ReplaySubject<Array<any>>(1);
    public countryFilterCtrl: FormControl = new FormControl();
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
                txtMobile: ['',[Validators.pattern('^(?=.*[0-9])[- +()0-9]+$'),Validators.minLength(10),Validators.maxLength(12)]],
              
              txtEmail: ['', Validators.email],
              password: ['',Validators.minLength(6)],
                txtQIDText: ['']
                });
                this.countryFilterCtrl.valueChanges
                .subscribe(() => {
                    this.filterSerach();
                });
                this.getCountry(5);

  }
  private filterSerach(): void{
    let search = this.countryFilterCtrl.value;
    if (!search) {
        this.filteredCount.next(this.countries.slice());
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
        this.filteredCount.next(this.countries);
     });

 }
 getCountry(selectedCountry): any {
    const reqbody = {
        'AUTO_SEARCH': ''
     };
     console.log(reqbody);
     this.apiService.CountryFilterGetAuto(reqbody).subscribe((data: Array<object>) => {
        this.countries = data['Data'];
        console.log("Test->");
        console.log(this.countries);
        this.filteredCount.next(this.countries);
            const curCountry={
            'CNT_NAME': 'QATAR',
            'CNT_PK':2
        }

        console.log(curCountry['CNT_PK']);
        this.selected=5;
    //     const toSelect = this.secondFormGroup.controls.ddlCountry.find(c => c.id == 3);
    //   this.patientCategory.get('patientCategory').setValue(toSelect);

      //  this.secondFormGroup.controls.ddlCountry.setValue(curCountry['CNT_PK']);
        // if (selectedCountry != '') {
        //     this.secondFormGroup.controls.ddlCountry.setValue(5);
        //  }
        // const curCountry={
        //     'CNT_NAME': 'QATAR',
        //     'CNT_PK':5
        // }
        // this.secondFormGroup = this._formBuilder.group({
        //     ddlCountry: [ curCountry['CNT_PK']]
        //   });
     });
    
    
    //this.filteredCount.next(this.countries.slice());
  }
  onCountrySelect()
{}
vendorSubmitbutton()
{}
}
