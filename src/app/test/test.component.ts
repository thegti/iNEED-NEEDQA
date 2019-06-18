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
  
    firstFormGroup:FormGroup;
    
   
    constructor(private apiService: ApiService,private vendorService: VendorService,private authService: AuthService,public _matDialog: MatDialog,  private _formBuilder: FormBuilder,private act_route: ActivatedRoute,private router: Router) { }

    ngOnInit(): void{
        this.firstFormGroup = this._formBuilder.group({
            txtCompany: [''],
        
            });
      
  }


}
