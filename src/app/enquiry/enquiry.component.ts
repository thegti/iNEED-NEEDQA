import { Component, OnInit } from '@angular/core';
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
import { MatRadioChange  } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/common/common.service';
import { EnquiryService } from '../services/enquiry/enquiry.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, FormGroupName} from '@angular/forms';
import {AuthService} from '../authentication/auth.service';
import {DialogComponent} from '../dialog/dialog.component';
import {ConstGroup} from '../utility/LocationConstants';
import {SerachGroup} from '../utility/SearchConstants';
import {SavaEnquiryModel} from '../business-object/EnquiryObject';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.scss']
})
export class EnquiryComponent implements OnInit {

    public selectedText: string;

    selectedLocation: any;
    selectedEnquiry:any;
    selectedlocationService:any;
    selectedKeyword:any;
    firstFormGroup: FormGroup;
    secondFormGroup:FormGroup;
    filteredCount:any;
    next:boolean=true;
    isFirst: boolean=true;
    selectedfile: File;
    enableNext: Boolean;
    imgname: any = '';
    imgChange: Boolean = false;
    formdt: FormData = new FormData();
    enquiryRequest: SavaEnquiryModel;
    // confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    confirmDialogRef: MatDialogRef<DialogComponent>;
    DialogRef: MatDialogRef<DialogComponent>;
    url = '../../assets/loginasset/images/display-img.jpg';
    moddate: any;
    currentMem:any;
    isView: Boolean = false;
    selectedFiles: FileList;
    fileName: string;
    unitOfMeasure: Array<Object>;
    selectedOption: string;
    filenames:Boolean=false;     
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
  
    public locationFilterCtrl: FormControl = new FormControl();
    public searchFilterCtrl: FormControl = new FormControl();
    public filteredLocation: ReplaySubject<Array<any>> = new ReplaySubject<Array<any>>(1);
    public filteredSearch: ReplaySubject<Array<any>> = new ReplaySubject<Array<any>>(1);
  
    constructor(private apiService: ApiService,private enquiryService: EnquiryService,private authService: AuthService,public _matDialog: MatDialog,  private _formBuilder: FormBuilder,private act_route: ActivatedRoute,private router: Router) { }
    ngOnInit() {
            this.ResetForm();
            this.firstFormGroup = this._formBuilder.group({
            ddlLocation: [null],
            // captcha: ['', Validators.required],
            ddlsearch: ['', Validators.required],
            ddllocation: ['', Validators.required],
            txtEmail: ['', Validators.email],
            txtMobile: ['',[Validators.pattern('^(?=.*[0-9])[- +()0-9]+$'),Validators.minLength(10),Validators.maxLength(12)]],
            txtOTP:['']

           
            });
            this.secondFormGroup = this._formBuilder.group({
                txtSearch: [''],
                txtQuantity: [''],
                ddlUnit: [''],
                txtApproximate: [''],
                txtdDescription: ['']
            
                });
              
            
        this.isFirst=true;
       // this.buttonNext();
       //Need to correct
       this.isFirst=false;
       this.next=true; 

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
        this.GetUom();

    }
    ResetForm()
    {
        this.selectedEnquiry=1;
        this.selectedlocationService=1;
        this.selectedLocation=0;
        this.selectedKeyword=0;
    }
    selectLocation(val)
    {
        this.selectedLocation=val;
    }
    selectSearch(val)
    {
        this.selectedKeyword=val;
    }
    onKeyWordSelect()
    {
        for (let i in this.keyword)
        {
            if (this.keyword[i]["VKW_PK"] == this.firstFormGroup.value.ddlsearch )
            {
               this.selectedText=this.keyword[i]["VKW_KWORD"];
            }

        }
        console.log(this.selectedText);
    }
    buttonPrevious()
    {
        var optCode=5555;
    if( optCode!=this.firstFormGroup.value.txtOTP)
      {
          alert('Invalid OTP!') ;
      }
      else
      {
        this.isFirst=true;
        this.next=false; 
        this.secondFormGroup.value.txtSearch= this.selectedText;
      }

       
    }
    
  buttonNext()
  {
    this.isFirst=false;
    this.next=true; 
  }

  EnableNextButton()
  {
    var optCode=5555;
    if( optCode!=this.firstFormGroup.value.txtOTP)
      {
          alert('Invalid OTP!') ;
      }
      else
      {
        this.next=false;  
        this.isFirst=true;
        this.secondFormGroup.value.txtSearch= this.selectedText;
      }
  }
  selected(event) {
    // let target = event.source.selected._element.nativeElement;
    // let selectedData = {
    //   value: event.value,
    //   text: target.innerText.trim()
    // };
    // console.log(selectedData);
    alert("hi");
}
  enquirySubmit(): void {
    this.moddate =  new Date().toISOString();
    this.enquiryRequest = {
        'VNQ_EMAIL': this.firstFormGroup.value.txtEmail,
        'VNQ_MOBILE': this.firstFormGroup.value.txtMobile,
        'VNQ_KWORD': this.selectedText,
        'VNQ_LOCATION': this.firstFormGroup.value.ddllocation,
        'VNQ_LOCATION_MODE': this.selectedEnquiry,
        'VNQ_DESC': this.secondFormGroup.value.txtdDescription,
        'VNQ_UOM': this.secondFormGroup.value.ddlUnit,
        'VNQ_QTY': this.secondFormGroup.value.txtQuantity,
        'VNQ_VALUE': this.secondFormGroup.value.txtApproximate,
        'VNQ_TYPE': this.selectedlocationService,
        'VNQ_ACTIVE': 1,
        'VNQ_PK': 0,
       'VNQ_MOD_DT':  this.moddate,
        'VNQ_DATE':this.moddate,
       'VNQ_USE':0,
       'VNQ_CURRENCY':1,
       'VNQ_STATUS':1,
       'VNQ_BIZUNIT':1,
       'VNQ_CRTD_BY':1,
       'VNQ_CRTD_DT':this.moddate,
       'VNQ_MOD_BY':1

    };
console.log('this.enquiryRequest');
console.log(this.enquiryRequest);
    this.enquiryService.SaveEnquiry(this.enquiryRequest).subscribe((data: Array<object>) => {
        if (data['Data'] > 0) {
            console.log('data0');
            console.log(data['Data']);
            this.confirmDialogRef = this._matDialog.open(DialogComponent, {
                disableClose: true
            });
            this.confirmDialogRef.componentInstance.Message = 'Thank you for submitting your requirment.You will be contacted soon, a copy of your requirment is shared in your email.';
            // this.confirmDialogRef.componentInstance.confirmMessage = 'Thank you for submitting your requirment.You will be contacted soon, a copy of your requirment is shared in your email.';
          //  alert('Member is registered succesfully');
          this.isFirst=true;
          this.next=false; 
          this.router.navigate(['/home']);
          this.confirmDialogRef.afterClosed().subscribe(result => {
            if ( result )
            {
                this.router.navigate(['/home']);
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

    

  
    // this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
    //     disableClose: false
    // });

    // this.confirmDialogRef.componentInstance.confirmMessage = 'Thank you for submitting your requirment.You will be contacted soon, a copy of your requirment is shared in your email.';

    // this.confirmDialogRef.afterClosed().subscribe(result => {
    //     if ( result )
    //     {

       
    //     this.DialogRef.componentInstance.Message = 'Record Deleted Successfully';
    // }
    // });
    this.clearSubmitForm();
   
}
  detectFiles(event) {
    this.selectedFiles = event.target.files;
    this.fileName = this.selectedFiles[0].name;
    console.log('selectedFiles: ' + this.fileName );
  }
  onSelectionchange(event): void{
   
    this.imgChange = true;
     this.selectedfile = event.target.files[0];
     this.imgname = uuid() + '_' + this.selectedfile.name;
     this.formdt.append('image', this.selectedfile , this.imgname);
  
    if (event.target.files && event.target.files[0]) {
     const reader = new FileReader();
 
     reader.readAsDataURL(event.target.files[0]); // read file as data url
 
     reader.onload = (even) => { // called once readAsDataURL is completed
        this.url = even.target['result'];
       
      };
     }
   }
  getLocation(): any {
    this.filteredLocation.next(this.location.slice());
  }


private filterLocation(): void{
    let search = this.locationFilterCtrl.value;
    if (!search) {
        this.filteredLocation.next(this.location.slice());
        return;
    } 
    else {
      search = search.toLowerCase();
    }
    var group=1;
    if(this.selectedLocation == 1)
    {
        group=ConstGroup.Qatar;
    }
    else
    if(this.selectedLocation == 2)
    {
        group=ConstGroup.OutsideQatar;
    }
    var reqbody = {
        'CON_GROUP': group,
        'AUTO_SEARCH': search
     };
    console.log(reqbody);
     this.apiService.ConstGetAuto(reqbody).subscribe((data: Array<object>) => {
        console.log("in");
       
        this.location = data['Data'];
        console.log(this.location);
        this.location.splice(0,0,this.searchDataNull);
        this.filteredLocation.next(this.location);
        console.log(this.filteredLocation);
     });
 }
 getKeyword(): any {
    this.filteredSearch.next(this.keyword.slice());
  }
 private filterSerach(): void{
    let search = this.searchFilterCtrl.value;
    if (!search) {
        this.filteredSearch.next(this.keyword.slice());
        return;
    } 
    else {
      search = search.toLowerCase();
    }
    var groups=1;
    if(this.selectedKeyword == 1)
    {
        groups=SerachGroup.Product;
    }
    else
    if(this.selectedKeyword == 2)
    {
        groups=SerachGroup.Services;
    }
    var reqbody = {
        'VKW_KWORD_TYPE': groups,
        'AUTO_SEARCH': search
     };
     console.log(reqbody);
     this.apiService.KeyWordGetAuto(reqbody).subscribe((data: Array<object>) => {
        this.keyword = data['Data'];
        console.log(this.keyword );
        this.keyword.splice(0,0,this.keywordDataNull);
        this.filteredSearch.next(this.keyword);
     });
 }
 GetUom()
 {
    const reqbody = {
        'UOM_PK': 1,
        'UOM_NAME':"kg"
     };
     this.apiService.GetUom(reqbody).subscribe((data: Array<object>) => {
        this.unitOfMeasure = data['Data'];
     }); 
 }

 resolved(value)
 {

 }
 clearSubmitForm()
 {
    this.firstFormGroup = this._formBuilder.group({
       
        // captcha: ['', Validators.required],
        ddlsearch: '',
        ddllocation: '',
        txtEmail: '',
        txtMobile:'',
        txtOTP:''

       
        });
    this.secondFormGroup = this._formBuilder.group({
        txtSearch: '',
        txtQuantity: '',
        ddlUnit: '',
        txtApproximate: '',
        txtdDescription: '',
        
        });
        this.filenames=true;   
      
 }

}
