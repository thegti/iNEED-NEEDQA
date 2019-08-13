import { Component, OnInit, OnDestroy } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { ReplaySubject } from 'rxjs';

import { map, catchError } from 'rxjs/operators'
import { MatDialog, MatDialogRef } from '@angular/material';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { locale as english } from 'app/navigation/i18n/en';
import { locale as turkish } from 'app/navigation/i18n/tr';
import { locale as arabic } from 'app/navigation/i18n/ar';
import { v4 as uuid } from 'uuid';
import { Router, ActivatedRoute } from '@angular/router';
import { MatRadioChange } from '@angular/material';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../services/common/common.service';
import { EnquiryService } from '../services/enquiry/enquiry.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, FormGroupName } from '@angular/forms';
import { AuthService } from '../authentication/auth.service';
import { DialogComponent } from '../dialog/dialog.component';
import { ConstGroup } from '../utility/LocationConstants';
import { SerachGroup } from '../utility/SearchConstants';
import { SavaEnquiryModel } from '../business-object/EnquiryObject';
import { NextdialogComponent } from '../popup/nextdialog/nextdialog.component';
import { SelectProducrServicedialogComponent } from '../popup/select-producr-servicedialog/select-producr-servicedialog.component';
import { SelectPersonalBusinessdialogComponent } from '../popup/select-personal-businessdialog/select-personal-businessdialog.component';
import { SharedData } from '../services/common/SharedData.service';
import { environment } from 'environments/environment';
import { Observable } from "rxjs";



@Component({
    selector: 'app-enquiry',
    templateUrl: './enquiry.component.html',
    styleUrls: ['./enquiry.component.scss']
})
export class EnquiryComponent implements OnInit, OnDestroy {
    public OtpMsg: string;
    public selectedText: string;
    enableClose: Boolean = false;
    public selectedLocation: any;
    selectedEnquiry: any;
    public DEFAULT_UOM: Number;
    public selectedlocationService: any;
    public selectedTypeService: any;
    public selectedKeyword: any;
    selectedUseType: any;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    filteredCount: any;
    next: boolean = true;
    isFirst: boolean = true;
    selectedfile: File;
    enableNext: Boolean;
    filename: any = '';
    fileChange: Boolean = false;
    formdt: FormData = new FormData();
    enquiryRequest: SavaEnquiryModel;
    confirmDialogRef: MatDialogRef<DialogComponent>;
    DialogRef: MatDialogRef<DialogComponent>;
    confirmNextDialogRef: MatDialogRef<NextdialogComponent>;
    NextDialogRef: MatDialogRef<NextdialogComponent>;
    moddate: any;
    currentMem: any;
    isView: Boolean = false;
    selectedFiles: FileList;
    fileName: string;
    unitOfMeasure: Array<Object>;
    currency: Array<Object>;
    selectedOption: string;
    filenames: Boolean = true;
    IsValidOtp: boolean = false;
    location: Array<Object> = [{
        'CON_NAME': 'Search',
        'CON_PK': 0
    }];
    horizontalStepperStep1: FormGroup;
    searchDataNull = {
        'CON_NAME': '--Select--',
        'CON_PK': 0
    };
    keyword: Array<Object> = [{
        'VKW_KWORD': 'Search',

    }];
    uom: Array<Object> = [{
        'UOM_NAME': 'Search',

    }];
    keywordDataNull = {
        'VKW_KWORD': '--Select--',

    }
    SelectProductServiceDialogRef: MatDialogRef<SelectProducrServicedialogComponent>;
    ProductServiceDialogRef: MatDialogRef<SelectProducrServicedialogComponent>;

    SelectPersonalBusinessDialogRef: MatDialogRef<SelectPersonalBusinessdialogComponent>;
    PersonalBusinessDialogRef: MatDialogRef<SelectPersonalBusinessdialogComponent>;

    public locationFilterCtrl: FormControl = new FormControl();
    public searchFilterCtrl: FormControl = new FormControl();
    public filteredLocation: ReplaySubject<Array<any>> = new ReplaySubject<Array<any>>(1);
    public filteredSearch: ReplaySubject<Array<any>> = new ReplaySubject<Array<any>>(1);
    mobnumPattern = "^((\\+91-?)|0)?[0-9]{8}$";



    constructor(private apiService: ApiService, private enquiryService: EnquiryService,
        private authService: AuthService, public _matDialog: MatDialog,
        private _formBuilder: FormBuilder, private act_route: ActivatedRoute,
        private sharedData: SharedData, private router: Router) { }
    ngOnInit(): void {

        this.ResetFormControls(true);
        this.isFirst = false;
        this.next = true;
        this.getLocation();
        this.getKeyword();

        this.locationFilterCtrl.valueChanges
            .subscribe(() => {
                this.filterLocation();
            });
        this.searchFilterCtrl.valueChanges
            .subscribe(() => {
                this.filterSerach();
            });
        this.filenames = true;
        this.GetUom();
        this.GetCurrency();
        // this.ConfigSettings();

        // Object.keys(this._formBuilder.controls).forEach(field => {
        //     const control = this.firstFormGroup.get(field);
        //     control.markAsTouched({ onlySelf: true });
        //     });
       
    }

    ResetFormControls(IsNew: boolean) {
        this.firstFormGroup = this._formBuilder.group({
            rdbProductType: [''],
            ddlsearch: ['', Validators.required],
            ddllocation: ['', Validators.required],
            txtName: ['', [Validators.required, Validators.minLength(3)]],
            txtEmail: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
            txtMobile: ['', [Validators.required, Validators.pattern(this.mobnumPattern)]],


        });

        this.secondFormGroup = this._formBuilder.group({
            txtSearch: [''],
            rdbUseType: [''],
            txtQuantity: ['', Validators.required],
            ddlUnit: ['', Validators.required],
            ddlCurrency: ['', Validators.required],
            txtApproximate: ['', Validators.required],
            txtdDescription: [''],
            photo: ['']
        });
        if (!IsNew) {
            this.firstFormGroup.controls.txtEmail.reset();
        }
    }
    // get rdbProductType() {
    //     return this.firstFormGroup.get('rdbProductType');
    //   }   

    // ResetForm() {
    //     this.selectedEnquiry = 1;
    //     this.selectedlocationService = 1;
    //     selectedlocationService: 1;
    //     this.selectedLocation = 1;

    //     this.selectedKeyword = 1;
    //     this.selectedUseType = 1;

    // }

    public VerifyOTP() {
    }
    selectLocation(e) {
        this.selectedLocation = e.value;

    }
    selectSearch(e) {
        this.selectedKeyword = e.value;


    }
    selectUseTypes(e) {
        this.selectedUseType = e.value;
    }
    onKeyWordSelect() {
        for (let i in this.keyword) {
            if (this.keyword[i]["VKW_PK"] == this.firstFormGroup.value.ddlsearch) {
                this.selectedText = this.keyword[i]["VKW_KWORD"];
            }

        }

    }
    buttonPrevious() {
        if (this.IsValidOtp == true) {
            this.isFirst = true;
            this.next = false;

        }
        else {
            this.isFirst = false;
            this.next = true;
        }


        this.secondFormGroup.value.txtSearch = this.selectedText;


        //     var optCode=5555;
        // if( optCode!=this.firstFormGroup.value.txtOTP)
        //   {
        //       alert('Invalid OTP!') ;
        //   }
        //   else
        //   {
        //     this.isFirst=true;
        //     this.next=false; 
        //     this.secondFormGroup.value.txtSearch= this.selectedText;
        //   }
    }

    buttonNext() {
        this.isFirst = false;
        this.next = true;

    }

    EnableNextButton() {

        if (this.selectedKeyword) {

            if (!this.IsValidOtp) {


                var reqbody = {
                    'NAME': this.firstFormGroup.value.txtName,
                    'EMAIL': this.firstFormGroup.value.txtEmail,
                    'MOBILE_NO': this.firstFormGroup.value.txtMobile
                };

                this.apiService.GenerateOtp(reqbody).subscribe((data: Array<object>) => {
                    this.sharedData.SetOTP(data['Data']['OTP']);
                    // console.log(data['Data']['OTP']);
                    this.OtpMsg = 'an otp has been sent to your ';
                    if (data['Data']['BY_MAIL'] == true && data['Data']['BY_SMS'] == true) {
                        this.OtpMsg = this.OtpMsg + 'mobile and email';

                    }
                    else if (data['Data']['BY_MAIL'] == true) {
                        this.OtpMsg = this.OtpMsg + 'email';

                    }
                    else if (data['Data']['BY_SMS'] == true) {
                        this.OtpMsg = this.OtpMsg + 'mobile';

                    }
                    this.sharedData.SetOtpMsg(this.OtpMsg);
                });

                const dialogRef = this._matDialog.open(NextdialogComponent);
                dialogRef.afterClosed().subscribe(result => {
                    if (result === 'submit') {
                        if (this.sharedData.GetIsValidOTP()) {
                            this.next = false;
                            this.isFirst = true;
                            this.IsValidOtp = true;
                            this.secondFormGroup.value.txtSearch = this.selectedText;

                        }
                    }
                });
            }
            else {
                this.next = false;
                this.isFirst = true;
                this.secondFormGroup.value.txtSearch = this.selectedText;

            }
        }
        else {
            this.SelectProductServiceDialogRef = this._matDialog.open(SelectProducrServicedialogComponent, {
                disableClose: true
            });
            this.SelectProductServiceDialogRef.componentInstance.Message = 'please select product or service';

        }
    }
    selected(event) {
        // let target = event.source.selected._element.nativeElement;
        // let selectedData = {
        //   value: event.value,
        //   text: target.innerText.trim()
        // };
        // console.log(selectedData);

    }

    enquirySubmit(): void {
        this.enableClose = false;
        this.moddate = new Date().toISOString();
        this.enquiryRequest = {
            'VNQ_PERSON_NAME': this.firstFormGroup.value.txtName,
            'VNQ_EMAIL': this.firstFormGroup.value.txtEmail,
            'VNQ_MOBILE': this.firstFormGroup.value.txtMobile,
            'VNQ_KWORD': this.selectedText,
            'VNQ_LOCATION': this.firstFormGroup.value.ddllocation,
            'VNQ_LOCATION_MODE': this.selectedLocation > 0 ? this.selectedLocation : 1,
            'VNQ_DESC': this.secondFormGroup.value.txtdDescription,
            'VNQ_UOM': this.secondFormGroup.value.ddlUnit,
            'VNQ_CURRENCY': this.secondFormGroup.value.ddlCurrency,
            'VNQ_QTY': this.secondFormGroup.value.txtQuantity,
            'VNQ_VALUE': this.secondFormGroup.value.txtApproximate,
            'VNQ_TYPE': this.selectedKeyword > 0 ? this.selectedKeyword : 1,
            'VNQ_ACTIVE': 1,
            'VNQ_PK': 0,
            'VNQ_MOD_DT': this.moddate,
            'VNQ_DATE': this.moddate,
            'VNQ_USE': this.selectedUseType > 0 ? this.selectedUseType : 1,
            'VNQ_STATUS': 1,
            'VNQ_BIZUNIT': 1,
            'VNQ_CRTD_BY': 1,
            'VNQ_CRTD_DT': this.moddate,
            'VNQ_MOD_BY': 1,
            'VNQ_DOC_ATTACH': this.filename,

        };
       
        if (!this.selectedUseType) {
            this.SelectPersonalBusinessDialogRef = this._matDialog.open(SelectPersonalBusinessdialogComponent, {
                disableClose: true
            });
            this.SelectPersonalBusinessDialogRef.componentInstance.Message = 'please select personal use or business use';
        }
        else {
            if (this.fileChange) {
               
                this.apiService.registerUserImage(this.formdt)
                    .subscribe(res => {
                    //   console.log('res',res);
                        if (res['Message'] == 1) {
                          
                            this.enquiryService.SaveEnquiry(this.enquiryRequest).subscribe((data: Array<object>) => {
                                this.afterSave(data['Data']);
                               
                            });
                        }

                    });
            }
            else {
                this.enquiryService.SaveEnquiry(this.enquiryRequest).subscribe((data: Array<object>) => {
                    this.afterSave(data['Data']);
                });
            }
        }
    }

    detectFiles(event) {
        this.selectedFiles = event.target.files;
        this.fileName = this.selectedFiles[0].name;
    }
    afterSave(val: number) {
        if (val > 0) {
            this.confirmDialogRef = this._matDialog.open(DialogComponent, {
                disableClose: true
            });
            this.confirmDialogRef.componentInstance.Message = 'thank you for submitting your requirement. you will be contacted soon, a copy of your requirment is sent to your email.';
            this.isFirst = false;
            this.next = true;
            this.IsValidOtp = false;
            this.confirmDialogRef.afterClosed().subscribe(result => {
                if (result) {

                }
                this.confirmDialogRef = null;
                this.firstFormGroup.reset();
                this.secondFormGroup.reset();
                this.GetUom();
                this.GetCurrency();
                this.filenames = false;
            });
        } else {
            this.confirmDialogRef = this._matDialog.open(DialogComponent, {
                disableClose: true
            });
            this.confirmDialogRef.componentInstance.isError = true;
            if (val === -1) {
                this.confirmDialogRef.componentInstance.Message = 'Error Occured';
            } else if (val === -2) {
                this.confirmDialogRef.componentInstance.Message = 'Already Exixts';
            } else if (val === -3) {
                this.confirmDialogRef.componentInstance.Message = 'Another user modified this record';
            } else if (val === 0) {
                this.confirmDialogRef.componentInstance.Message = 'Record Already Exixts';
            }
        }
    }
    onSelectionchange(event): void {

        this.fileChange = true;
        this.selectedfile = event.target.files[0];
        this.filename = uuid() + '_' + this.selectedfile.name;
        this.formdt.append('image', this.selectedfile, this.filename);

        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();

            reader.readAsDataURL(event.target.files[0]); // read file as data url

            reader.onload = (even) => { // called once readAsDataURL is completed
                // this.url = even.target['result'];

            };
        }
    }
    getLocation(): any {
        this.filteredLocation.next(this.location.slice());
    }


    private filterLocation(): void {
        let search = this.locationFilterCtrl.value;
        if (!search) {
            this.filteredLocation.next(this.location.slice());
            return;
        }
        else {
            search = search.toLowerCase();
        }
        var group = 1;
        if (this.selectedLocation == 1) {
            group = ConstGroup.Qatar;
        }
        else
            if (this.selectedLocation == 2) {
                // group=ConstGroup.OutsideQatar;
                group = ConstGroup.Qatar;
            }
        var reqbody = {
            'CON_GROUP': group,
            'AUTO_SEARCH': search
        };

        this.apiService.ConstGetAuto(reqbody).subscribe((data: Array<object>) => {
            this.location = data['Data'];
            this.location.splice(0, 0, this.searchDataNull);
            this.filteredLocation.next(this.location);

        });
    }
    getKeyword(): any {
        this.filteredSearch.next(this.keyword.slice());
    }
    private filterSerach(): void {
        let search = this.searchFilterCtrl.value;
        if (!search) {
            this.filteredSearch.next(this.keyword.slice());
            return;
        }
        else {
            search = search.toLowerCase();
        }
        var groups = 1;
        if (this.selectedKeyword == 1) {
            groups = SerachGroup.Product;
        }
        else
            if (this.selectedKeyword == 2) {
                groups = SerachGroup.Services;
                this.secondFormGroup.get('txtQuantity').setValue('1');

            }
        var reqbody = {
            'VKW_KWORD_TYPE': groups,
            'AUTO_SEARCH': search
        };

        this.apiService.KeyWordGetAuto(reqbody).subscribe((data: Array<object>) => {
            this.keyword = data['Data'];
            this.keyword.splice(0, 0, this.keywordDataNull);
            this.filteredSearch.next(this.keyword);
        });
    }
    GetUom() {
        const reqbody = {
            'UOM_PK': 1,
            'UOM_NAME': "kg"
        };
        this.apiService.GetUom(reqbody).subscribe((data: Array<object>) => {
            this.unitOfMeasure = data['Data'];
            this.secondFormGroup.controls.ddlUnit.setValue(environment.DEFAULT_UOM);
        });
    }

    GetCurrency() {
        const reqbody = {

        };
        this.apiService.GetCurrency(reqbody).subscribe((data: Array<object>) => {
            this.currency = data['Data'];
            this.secondFormGroup.controls.ddlCurrency.setValue(environment.DEFAULT_CURRENCY);
        });
    }
    // ConfigSettings() {

    //     this.DEFAULT_UOM = environment.DEFAULT_UOM;

    // }

    resolved(value) {

    }
    ngOnDestroy(): void {
        this.firstFormGroup = this._formBuilder.group({
            ddlLocation: [null],

            ddlsearch: ['', Validators.required],
            ddllocation: ['', Validators.required],
            txtName: ['', [Validators.required, Validators.minLength(3)]],
            txtEmail: [''],
            txtMobile: ['', [Validators.pattern('^(?=.*[0-9])[- +()0-9]+$'), Validators.minLength(10), Validators.maxLength(12)]],
            txtOTP: ['', Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
            txtSearch: [''],
            txtQuantity: ['', Validators.required],
            ddlUnit: ['', Validators.required],
            ddlCurrency: ['', Validators.required],
            txtApproximate: [''],
            txtdDescription: [''],
          
        });
    }

    get validation() {
        return this.firstFormGroup.controls;
    }

    get mobilevalid() {
        return this.firstFormGroup.controls;
    }
    get txtNamevalid() {
        return this.firstFormGroup.controls;
    }
    get ddlsearchvalid() {
        return this.firstFormGroup.controls;
    }
    get ddllocationvalid() {
        return this.firstFormGroup.controls;
    }

    numericOnly(event): boolean {
        let patt = /^([0-9])$/;
        let result = patt.test(event.key);
        return result;
    }

    // test() {
      
    //     this.router.navigate(['/downloads/04fea22a-57c2-4183-8063-6b11954f388f-8dabc7f1-30aa-47a2-9170-5c2099a3d6b2']);

    // }

  
}
