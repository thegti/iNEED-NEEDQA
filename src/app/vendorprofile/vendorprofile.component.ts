import { Component, OnInit,ViewChild,ElementRef, Renderer2 } from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import { v4 as uuid } from 'uuid';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, FormGroupName} from '@angular/forms';
import {VendorKeywordModel} from '../business-object/VendorObject';
import {VendorGetModel} from '../business-object/VendorObject';
import { VendorService } from '../services/vendor/vendor.service';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import {User} from '../authentication/user.model';
import {AuthService} from '../authentication/auth.service';
import { ApiService } from '../services/common/common.service';
import { debug } from 'util';
import {VendorSalesLeadModel} from '../business-object/VendorObject';
import { SerachGroup } from 'app/utility/SalesLoadUse';
import {SalesProductGroup} from 'app/utility/SalesProducts';
import {SalesValueGroup} from 'app/utility/SalesValue';
import {VendorsavedialogComponent} from '../popup/vendorsavedialog/vendorsavedialog.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component';
import {VendorkeyworddeletedialogComponent} from '../popup/vendorkeyworddeletedialog/vendorkeyworddeletedialog.component'
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { from } from 'rxjs';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { Router,ActivatedRoute } from '@angular/router';
import {VendorEmailChangedialogComponent} from '../popup/vendor-email-changedialog/vendor-email-changedialog.component';
import { $ } from 'protractor';


@Component({
  selector: 'app-vendorprofile',
  templateUrl: './vendorprofile.component.html',
  styleUrls: ['./vendorprofile.component.scss']
})

export class VendorprofileComponent implements OnInit {
  @ViewChild('search') searchElement: ElementRef;
  displayedColumns: string[] = ['checkbox','VKW_KWORD','Edit'];
  dataSource: MatTableDataSource<VendorKeywordModel>;
  keywordList: VendorKeywordModel[]=[]; 
  VendorGetList : VendorGetModel[]=[];
  VendorSalesSaveList : VendorSalesLeadModel[]=[];
  tempObject: VendorKeywordModel;
  tempAddObject: VendorKeywordModel;
  editKeywordObject : VendorKeywordModel;
  DeleteKeywordObject :VendorKeywordModel;
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
  public vendorEmail: string ='';
  public vendorSalesMobile: string ='';
  public vendorWhatsappMobile: string ='';
  public vendorMinValue: string ='';
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
  //  mobnumPattern = "/([5-9][0-9])|([1-9]\d{3}\d*)/"; 
  IsPersonalUse: boolean =true;
  IsBusinessUse: boolean;
  IsBoth: boolean;
  IsProductType: boolean =true;
  IsServiceType: boolean;
  IsBothType : boolean;
  IsValueType : boolean =true;
  IsGreaterValueType : boolean;
  private LanguageType: number=1;
  public ValueTxtValue:boolean=false;
  public  configvalue: String;
  IsAdmin : boolean =false;
  KeywordDeleteDialogRef: MatDialogRef<VendorkeyworddeletedialogComponent>;
  KeywordDialogRef: MatDialogRef<VendorkeyworddeletedialogComponent>;

  EmailChangeDialogRef: MatDialogRef<VendorEmailChangedialogComponent>;
  EmailDialogRef: MatDialogRef<VendorEmailChangedialogComponent>;
  // IsHideTxtValue:boolean=false;
VendorSaveDialogRef: MatDialogRef<VendorsavedialogComponent>;
  VendorDialogRef: MatDialogRef<VendorsavedialogComponent>;
 
  constructor(private _formBuilder: FormBuilder,private vendorService: VendorService,  private _fuseSidebarService: FuseSidebarService,
    private authService: AuthService,private apiService: ApiService,public _matDialog: MatDialog,
    private router: Router,private _elementRef: ElementRef,private _renderer: Renderer2 ) {
    
   }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
       txtKeyword: [''],
       txtEmail : ['jj',[Validators.required, Validators.email]],
       txtSalesMobile: ['', [Validators.required,Validators.pattern(this.mobnumPattern)]],
       txtWhatsappMobile: ['', [Validators.pattern(this.mobnumPattern)]],
       txtValue : ['']
      });
      
    this.filenames=true;  
    this.user= this.authService.getUserDetail();
    this.IsAdmin = this.user.ROL_PK==1 ? true : false;
    this.GetVendor();
    // setTimeout(()=>{ // this will make the execution after the above boolean has changed
    //  
    // },0);  
    this.SetLeadsFor(1);
    this.SetLeadsTypeFor(1);
    this.SetValueTypeFor(1);
    this.ConfigGet();
   
    
  }

  
  sidebarMenu(item)
  {
    this.selectedItem=item;
    switch(item)
    {
      case 'item3':
          this.GetKeywords();
          this.IsHideUploadDiv=false;
          this.firstFormGroup = this._formBuilder.group({
            txtKeyword: ['', Validators.required],
            txtEmail : [''],
            txtSalesMobile: [''],
            txtWhatsappMobile: [''],
            txtValue : ['']
            });
             this.keywordErrorMsg='';
        break;
        case 'item4':
          this.GetSalesLeadSetup();
         
          break;
    }

   this.GetSidebarOpen();
    
  }
GetSidebarOpen()
{
  var element = document.querySelector(".sidebar");
     element.classList.remove('open');
     
    let SidebarOverlay = document.querySelector('.fuse-sidebar-overlay');
    SidebarOverlay.classList.remove('fuse-sidebar-overlay');
    SidebarOverlay.classList.add('fuse-sidebar-overlay-invisible');
 
     
      
}
toggleSidebar(name): void
{
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  
}
  UploadKeywordButton()
  {
    // this.uploadkeyword=false;
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
   AddKeywordButton()
   {
    this.IsHideUploadDiv=true;
    this.firstFormGroup = this._formBuilder.group({
      txtKeyword: ['', Validators.required],
      txtEmail : [''],
      txtSalesMobile: [''],
      txtWhatsappMobile: [''],
      txtValue : ['']
      });
      this.firstFormGroup.value.txtKeyword.reset();
   }
   
  //  AddNewKeywordButton()
  //  {
   
  //   this.keywordList.push({keyword:this.keyword});
  //  }
   CancelNewKeywordButton()
   {
    setTimeout(()=>{ // this will make the execution after the above boolean has changed
      this.IsHideUploadDiv=false;
    },10);
    this.keywordErrorMsg='';
   }
   GetKeywords()
   {
    this.tempObject=
    {
       "ROW_NO" : 1,
       "VKW_PK" :0,
       "VKW_KWORD" : "",
       "VKW_KWORD_TYPE" : this.LanguageType,
       "VKW_VENDOR" :this.user.VND_PK
    }
    this.vendorService.VendorKeywordGet(this.tempObject).subscribe((data: Array<object>) => {
      this.keywordList = data['Data'];
      this.dataSource = new MatTableDataSource(this.keywordList);
     
   });

    // this.keywordList.push( this.tempObject);
    // this.keywordList.push( this.tempObject);
   }

   GetVendor()
   {
    var reqObj={"VNQ_PK":this.user.VND_PK};
    this.vendorService.VendorGet(reqObj).subscribe((data: Array<object>) => {
      this.VendorGetList = data['Data'];
      this.VendorRegistrationId =this.VendorGetList[0].Vendor_Reg_No;
      this.VendorRegistrationName=this.VendorGetList[0].Vendor_Name;
      this.VendorAddress=this.VendorGetList[0].Vendor_Address;
      this.VendorPin=this.VendorGetList[0].Vendor_PO_No;
      this.VendorCity=this.VendorGetList[0].Vendor_City;
      this.VendorCountry=this.VendorGetList[0].Vendor_Country;
      this.VendorMob=this.VendorGetList[0].Vendor_Mobile;
      this.VendorCrn=this.VendorGetList[0].Vendor_QID;
      this.VendorEmail=this.VendorGetList[0].Vendor_Emailid;
      this.VendorStatus=this.VendorGetList[0].Vendor_Status;
      this.VendorExpiry=this.VendorGetList[0].Vendor_Account_Expiry;
      this.VendorPlan =this.VendorGetList[0].Vendor_Plan;
   });

   }
   AddNewKeywordButton()
   {
  
     if(this.IsEditRow)
     {
        this.editKeywordObject.VKW_KWORD=this.firstFormGroup.value.txtKeyword;
        this.tempAddObject=this.editKeywordObject;
     }
     else
     {
      this.tempAddObject=
        {
          "ROW_NO" : this.keywordList!=null ? this.keywordList.length+1 : 1,
          "VKW_PK":0,
          "VKW_KWORD" : this.firstFormGroup.value.txtKeyword,
          "VKW_KWORD_TYPE" : this.LanguageType,
          "VKW_VENDOR" : this.user.VND_PK
        }
      }
       
        this.vendorService.VendorKeywordSave(this.tempAddObject).subscribe((data: Array<object>) => {
          // this.keywordList = data['Data'];
        
          if (data['Data'] > 0) {
            this.KeywordDeleteDialogRef = this._matDialog.open(VendorkeyworddeletedialogComponent, {
              disableClose: true
          });        
          this.KeywordDeleteDialogRef.componentInstance.Message = 'keyword saved successfully';
            this.AddToList(this.IsEditRow);
            this.firstFormGroup = this._formBuilder.group({
              txtKeyword: ['', Validators.required],
              txtEmail : [''],
              txtSalesMobile: [''],
              txtWhatsappMobile: [''],
              txtValue : ['']
              });
              this.IsEditRow=false;
          }
          else if (data['Data'] === 0) {
              this.keywordErrorMsg='already added';
              this.firstFormGroup = this._formBuilder.group({
                txtKeyword: ['', Validators.required],
                txtEmail : [''],
                txtSalesMobile: [''],
                txtWhatsappMobile: [''],
                txtValue : ['']
                });
          }
      });
      this.keywordErrorMsg='';
  
 }
 ChangeText(){
   this.keywordErrorMsg='';
 }

    AddToList(IsUpdate: boolean)
    {
      if( this.keywordList==null)
      {
       this.GetKeywords();
      }
      else if(IsUpdate)
      {
        this.keywordList.forEach(object=>
          {
            if(object.ROW_NO==this.tempAddObject.ROW_NO)
            {
              object=this.tempAddObject;
            }
          });
          this.dataSource = new MatTableDataSource(this.keywordList);
      }
      else{
        this.GetKeywords();

          // this.keywordList.push( this.tempAddObject);
          // this.dataSource = new MatTableDataSource(this.keywordList);
      }
    }
      
    
   forEdit(value): any {
   

    this.editKeywordObject=value   
    this.firstFormGroup = this._formBuilder.group({
      txtKeyword: [this.editKeywordObject.VKW_KWORD, Validators.required],
      txtEmail : [''],
      txtSalesMobile: [''],
      txtWhatsappMobile: [''],
      txtValue : ['']
      });
    this.IsEditRow=true;
    this.keywordErrorMsg='';
    setTimeout(()=>{ // this will make the execution after the above boolean has changed
      this.IsHideUploadDiv=true;
      this.searchElement.nativeElement.focus();
    },0);  
   }


   forDelete(value): void {
    this.DeleteKeywordObject=value   
    this.KeywordDeleteDialogRef = this._matDialog.open(VendorkeyworddeletedialogComponent, {
        disableClose: false
    });

    this.KeywordDeleteDialogRef.componentInstance.Message  = 'are you sure you want to delete?';
    this.KeywordDeleteDialogRef.afterClosed().subscribe(result => {
        if ( result )
        {
          var reqObj={ "VKW_VENDOR" :this.user.VND_PK,"VKW_PK": this.DeleteKeywordObject.VKW_PK};
            this.vendorService.VendorKeywordDelete(reqObj).subscribe((res: Array<object>) => {
              if (res['Data'] > 0) {                     
                this.KeywordDeleteDialogRef = this._matDialog.open(VendorkeyworddeletedialogComponent, {
                    disableClose: true
                });        
                this.KeywordDeleteDialogRef.componentInstance.Message = 'keyword deleted successfully';
                this.GetKeywords();
 
        }
        else {
          this.KeywordDeleteDialogRef = this._matDialog.open(VendorkeyworddeletedialogComponent, {
              disableClose: true
          });
          this.KeywordDeleteDialogRef.componentInstance.isError = true;
          if (res['Data']=== -1){
              this.KeywordDeleteDialogRef.componentInstance.Message = 'error occured';
          }
        }
    
    });
  };
  this.KeywordDeleteDialogRef = null;
  });
}

   GetSalesLeadSetup()
   {
    var reqObj= {"VST_VENDOR":  this.user.VND_PK};
    this.firstFormGroup = this._formBuilder.group({
        txtEmail : ['',[Validators.required, Validators.email,Validators.maxLength(50)] ],
        txtSalesMobile: ['', [Validators.required,Validators.pattern(this.mobnumPattern)]],
        txtWhatsappMobile: ['', [Validators.pattern(this.mobnumPattern)]],
        txtKeyword : [''],
        txtValue : [this.configvalue]
       });
      
    this.vendorService.GetSalesLeadSetup(reqObj).subscribe((data: Array<object>) => {
      if(data['Data']!=null){
          this.IsEditSalesLead=true;
          this.salesLeadList = data['Data'];
          this.SetLeadsFor(this.salesLeadList[0].VST_ENQUIRY_USE);
          this.SetLeadsTypeFor(this.salesLeadList[0].VST_ENQUIRY_TYPE);
          this.SetValueTypeFor(this.salesLeadList[0].VST_VALUE_TYPE);
          // console.log(this.salesLeadList[0].VST_EMAIL);
          // this.vendorEmail=this.salesLeadList[0].VST_EMAIL;
          // this.vendorSalesMobile=this.salesLeadList[0].VST_MOBILE;
          // this.vendorWhatsappMobile=this.salesLeadList[0].VST_WHATSAPP;
          // this.vendorMinValue=this.salesLeadList[0].VST_MIN_VALUE;

          this.firstFormGroup = this._formBuilder.group({
            txtEmail : [this.salesLeadList[0].VST_EMAIL,[Validators.required, Validators.email,Validators.maxLength(50)] ],
            txtSalesMobile: [this.salesLeadList[0].VST_MOBILE, [Validators.required,Validators.pattern(this.mobnumPattern)]],
            txtWhatsappMobile: [this.salesLeadList[0].VST_WHATSAPP, [Validators.pattern(this.mobnumPattern)]],
            txtKeyword : [''],
            txtValue : [this.salesLeadList[0].VST_MIN_VALUE]
          });
      }
   },
   error => {
     alert("Internal Server Error!");
   });
   }

   SetLeadsFor(type:number)
   {
     this.IsPersonalUse = type==1 ? true : false;
     this.IsBusinessUse = type==2 ? true : false;
     this.IsBoth = type==3 ? true : false;
     this.selectedSalesUse=type;
   }
   SetLeadsTypeFor(type:number)
   {
     this.IsProductType = type==1 ? true : false;
     this.IsServiceType = type==2 ? true : false;
     this.IsBothType = type==3 ? true : false;
     this.productSalesUse=type;
   }
   SetValueTypeFor(type:number)
   {
     this.IsValueType = type==1 ? true : false;
     this.IsGreaterValueType = type==2 ? true : false;
     this.ValueTxtValue = type==2 ? true : false;
     this.valueSalesUse=type;
   }

   SaveSalesLeadButton()
   {
    this.moddate =  new Date().toISOString();
    var PK = this.salesLeadList==null ? 0 : this.salesLeadList[0].VST_PK;
    var strVale=this.firstFormGroup.value.txtValue;
    if(!strVale)//If empty String
      strVale="0";
    if(this.valueSalesUse==1)// If any value selected
      strVale="0";
   
    this.salesLeadSaveTempObject=
    {
      "VST_PK" : PK,
      "VST_VENDOR" : this.user.VND_PK,
      "VST_EMAIL" :	this.firstFormGroup.value.txtEmail,
      "VST_MOBILE" : this.firstFormGroup.value.txtSalesMobile,	
      "VST_WHATSAPP" :this.firstFormGroup.value.txtWhatsappMobile,
      "VST_ENQUIRY_TYPE" :this.productSalesUse> 0 ? this.productSalesUse : 1,	
      "VST_ENQUIRY_USE"	:this.selectedSalesUse> 0 ? this.selectedSalesUse : 1, 
      "VST_CURRENCY" :0,			
      "VST_MIN_VALUE" :strVale ,
      "VST_MOD_BY" :this.user.USR_PK,	
      "VST_VALUE_TYPE" :	this.valueSalesUse> 0 ? this.valueSalesUse : 1, 	
      "VST_MOD_DT" :this.moddate,
    }
   
    this.vendorService.VendorSalesLeadSave(this.salesLeadSaveTempObject).subscribe((data: Array<object>) => {
      if(data["Data"]>0)
          {
            this.GetSalesLeadSetup();
          // this.dataSource = new MatTableDataSource(this.keywordList);
          this.VendorSaveDialogRef = this._matDialog.open(VendorsavedialogComponent,  {
            disableClose: true
            });
      
        // this.VendorSaveDialogRef.componentInstance.Message = 'sales lead details of '+this.VendorRegistrationName+' is submitted successfully';
          this.VendorSaveDialogRef.componentInstance.Message = 'sales lead details are submitted successfully';
        
          this.VendorSaveDialogRef.afterClosed().subscribe(result => {
            if ( result )
              {

              }
          this.VendorSaveDialogRef = null;
          });
        }
        else{
          alert("server error!")
        }
     });
    
    }

   
get validation() { 
     return this.firstFormGroup.controls;
     }
     get mobilevalid1() {
      return this.firstFormGroup.controls;
   } 

     get mobilevalid() {
      return this.firstFormGroup.controls;
  
   } 
   numericOnly(event): boolean {    
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
} 
SelectUseTypes(e)
{
  var groups=1;
  this.selectedSalesUse=e.value;
  if(this.selectedSalesUse == 1)
  {
      groups=SerachGroup.Personal;
  }
  else
  if(this.selectedSalesUse == 2)
  {
      groups=SerachGroup.Business;
  }
  if(this.selectedSalesUse == 3)
  {
      groups=SerachGroup.Both;
  }
  
 
}


SelectProductTypes(e)
{
  var groups=1;
  this.productSalesUse=e.value;
  if(this.productSalesUse == 1)
  {
      groups=SalesProductGroup.Product;
  }
  else
  if(this.productSalesUse == 2)
  {
      groups=SalesProductGroup.Services;
  }
  if(this.productSalesUse == 3)
  {
      groups=SerachGroup.Both;
  }
  

 
}

SelectValueTypes(e)
{
 
  this.valueSalesUse=e.value
  var groups=1;
  if(this.valueSalesUse == 1)
  {
      groups=SalesValueGroup.value;
      this.ValueTxtValue = false;
      
  }
  else
  if(this.valueSalesUse == 2)
  {
      groups=SalesValueGroup.greaterValue;
      this.ValueTxtValue = true;
   
      
  }

}
cancelButton()
{

}
 
downloadCsvButton()
{}
detectFiles(value)
{}
uploadCsvButton()
{}
GenerateButton()
{}
get formControls() { return this.firstFormGroup.controls; }
// get txtSalesMobile() {
//   return this.firstFormGroup.get('txtSalesMobile');
// }  
// get txtWhatsappMobile() {
//   return this.firstFormGroup.get('txtWhatsappMobile');
// }   

ConfigGet()
{
    const reqbody = {
      "CNS_SETTING" : "VND_TXT_VAL"
     };
     this.apiService.ConfigGet(reqbody).subscribe((data: Array<object>) => {
      this.configvalue = data['Data'][0].CNS_DATA;
     });

}
vendorlistingClick()
{
  this.router.navigate(['/vendorlisting/']);
}
PlanRenewalButton()
{
  this.router.navigate(['/payment/']);
}
EmailChangeButton()
{
  this.EmailChangeDialogRef = this._matDialog.open(VendorEmailChangedialogComponent, {
    disableClose: true
});   
// this.EmailChangeDialogRef.componentInstance.MessageEmail = 'email';

}


}
