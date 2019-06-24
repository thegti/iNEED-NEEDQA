import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
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
import { debug } from 'util';
import {VendorSalesLeadModel} from '../business-object/VendorObject';
import { SerachGroup } from 'app/utility/SalesLoadUse';
import {SalesProductGroup} from 'app/utility/SalesProducts';
import {SalesValueGroup} from 'app/utility/SalesValue';
import {VendorsavedialogComponent} from '../vendorsavedialog/vendorsavedialog.component';
import { MatDialog, MatDialogRef } from '@angular/material';


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
  // IsHideTxtValue:boolean=false;
VendorSaveDialogRef: MatDialogRef<VendorsavedialogComponent>;
  VendorDialogRef: MatDialogRef<VendorsavedialogComponent>;
  constructor(private _formBuilder: FormBuilder,private vendorService: VendorService,
    private authService: AuthService,public _matDialog: MatDialog, ) {
    
   }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
       txtKeyword: [''],
       txtEmail : ['',[Validators.required, Validators.email]],
       txtSalesMobile: ['', [Validators.required,Validators.pattern(this.mobnumPattern)]],
       txtWhatsappMobile: ['', [Validators.pattern(this.mobnumPattern)]],
       txtValue : ['']
      });
      
    this.filenames=true;  
    this.user= this.authService.getUserDetail();
    this.GetVendor();
    // setTimeout(()=>{ // this will make the execution after the above boolean has changed
    //  
    // },0);  

    
    this.SetLeadsFor(1);
    this.SetLeadsTypeFor(1);
    this.SetValueTypeFor(1);
  
   
    
  }
 
  sidebarMenu(item)
  {
    this.selectedItem=item;
    console.log(this.selectedItem);
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
    console.log(this.tempObject);
    this.vendorService.VendorGet(reqObj).subscribe((data: Array<object>) => {
      this.VendorGetList = data['Data'];
      console.log(data);
      console.log(this.VendorGetList);
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
     console.log(this.keywordList!=null);
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
        console.log(this.tempAddObject);
        this.vendorService.VendorKeywordSave(this.tempAddObject).subscribe((data: Array<object>) => {
          // this.keywordList = data['Data'];
          console.log(data['Data']);
          if (data['Data'] > 0) {
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
          this.keywordList.push( this.tempAddObject);
          this.dataSource = new MatTableDataSource(this.keywordList);
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


   GetSalesLeadSetup()
   {
    var reqObj= {"VST_VENDOR":  this.user.VND_PK};
    this.firstFormGroup = this._formBuilder.group({
        txtEmail : ['',[Validators.required, Validators.email,Validators.maxLength(50)] ],
        txtSalesMobile: ['', [Validators.required,Validators.pattern(this.mobnumPattern)]],
        txtWhatsappMobile: ['', [Validators.pattern(this.mobnumPattern)]],
        txtKeyword : [''],
        txtValue : ['']
       });
       
    this.vendorService.GetSalesLeadSetup(reqObj).subscribe((data: Array<object>) => {
      console.log(data);
      this.IsEditSalesLead=true;
      this.salesLeadList = data['Data'];
      this.firstFormGroup = this._formBuilder.group({
        // txtEmail:this.
        txtEmail: [this.salesLeadList[0].VST_EMAIL,Validators.required, Validators.email],
        txtSalesMobile : [this.salesLeadList[0].VST_MOBILE,Validators.required,Validators.pattern(this.mobnumPattern)],
        txtWhatsappMobile: [this.salesLeadList[0].VST_WHATSAPP,Validators.pattern(this.mobnumPattern)],
        txtValue : [this.salesLeadList[0].VST_MIN_VALUE],
        txtKeyword:[''],
        
        });
        this.SetLeadsFor(this.salesLeadList[0].VST_ENQUIRY_TYPE);
        this.SetLeadsTypeFor(this.salesLeadList[0].VST_ENQUIRY_USE);
        this.SetValueTypeFor(this.salesLeadList[0].VST_VALUE_TYPE);
   });
   }

   SaveSalesLeadButton()
   {
    this.moddate =  new Date().toISOString();
    var PK = this.salesLeadList==null ? 0 : this.salesLeadList[0].VST_PK;
    var strVale=this.firstFormGroup.value.txtValue;
    strVale=strVale.length>0 ? strVale : 0;
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
    console.log(this.salesLeadSaveTempObject);
    this.vendorService.VendorSalesLeadSave(this.salesLeadSaveTempObject).subscribe((data: Array<object>) => {
        console.log(data);
      // this.dataSource = new MatTableDataSource(this.keywordList);
      this.VendorSaveDialogRef = this._matDialog.open(VendorsavedialogComponent, {
        disableClose: true
    });
   
    this.VendorSaveDialogRef.componentInstance.Message = 'Sales lead details of  are submitted successfully';
    
  this.VendorSaveDialogRef.afterClosed().subscribe(result => {
    if ( result )
    {
       
    }
    this.VendorSaveDialogRef = null;
     
 
});
     
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
  
  console.log(this.selectedSalesUse);
}

  SetLeadsFor(type:number)
  {
    this.IsPersonalUse = type==1 ? true : false;
    this.IsBusinessUse = type==2 ? true : false;
    this.IsBoth = type==3 ? true : false;
  }
  SetLeadsTypeFor(type:number)
  {
    this.IsProductType = type==1 ? true : false;
    this.IsServiceType = type==2 ? true : false;
    this.IsBothType = type==3 ? true : false;
  }
  SetValueTypeFor(type:number)
  {
    this.IsValueType = type==1 ? true : false;
    this.IsGreaterValueType = type==2 ? true : false;
    this.ValueTxtValue = type==2 ? true : false;
  
  
  
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
  

  console.log(this.productSalesUse);
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
toggleSidebar(value)
{}
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



}
