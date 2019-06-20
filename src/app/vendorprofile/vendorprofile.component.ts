import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import { v4 as uuid } from 'uuid';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, FormGroupName} from '@angular/forms';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {VendorKeywordModel} from '../business-object/VendorObject';
import {VendorGetModel} from '../business-object/VendorObject';
import { VendorService } from '../services/vendor/vendor.service';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import {User} from '../authentication/user.model';
import {AuthService} from '../authentication/auth.service';
import { debug } from 'util';
import {VendorSalesGetModel} from '../business-object/VendorObject';
import { SerachGroup } from 'app/utility/SalesLoadUse';
import {SalesProductGroup} from 'app/utility/SalesProducts';
import {SalesValueGroup} from 'app/utility/SalesValue';


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
  tempObject: VendorKeywordModel;
  tempAddObject: VendorKeywordModel;
  editKeywordObject : VendorKeywordModel;
  VendortempObject : VendorKeywordModel;
  salesLeadTempObject : VendorKeywordModel;
  salesLeadSaveTempObject : VendorKeywordModel;
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
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$"; 
  private LanguageType: number=1;
  constructor(private _formBuilder: FormBuilder,private vendorService: VendorService,
    private authService: AuthService,) {
    
   }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      txtKeyword: ['', Validators.required],
      txtSalesEmail : ['',[Validators.required, Validators.email,Validators.maxLength(50)] ],
      txtSalesMobile: ['', [Validators.required,Validators.pattern(this.mobnumPattern),Validators.minLength(10),Validators.maxLength(12)]],
      txtWhatsappMobile: ['', [Validators.required,Validators.pattern(this.mobnumPattern),Validators.minLength(10),Validators.maxLength(12)]],
      });
    this.filenames=true;  
    this.user= this.authService.getUserDetail();
    this.GetVendor();
    
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
            txtKeyword:'',
            });
             this.keywordErrorMsg='';
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
      txtKeyword:'',
      });
      this.firstFormGroup.value.txtKeyword.reset();
   
   }
  //  AddNewKeywordButton()
  //  {
   
  //   this.keywordList.push({keyword:this.keyword});
  //  }
   CancelNewKeywordButton()
   {
    this.IsHideUploadDiv=false;
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
     if(this.IsEditRow)
     {
        this.editKeywordObject.VKW_KWORD=this.firstFormGroup.value.txtKeyword;
        this.tempAddObject=this.editKeywordObject;
     }
     else
     {
      this.tempAddObject=
        {
          "ROW_NO" : this.keywordList.length+1,
          "VKW_PK":0,
          "VKW_KWORD" : this.firstFormGroup.value.txtKeyword,
          "VKW_KWORD_TYPE" : this.LanguageType,
          "VKW_VENDOR" : this.user.VND_PK
        }
      }
        console.log(this.tempAddObject);
        this.vendorService.VendorKeywordSave(this.tempAddObject).subscribe((data: Array<object>) => {
          // this.keywordList = data['Data'];
          this.IsEditRow=false;
          console.log(data['Data']);
          if (data['Data'] > 0) {
            this.AddToList(this.IsEditRow);
             this.firstFormGroup = this._formBuilder.group({
              txtKeyword:'',
              });
          }
          else if (data['Data'] === 0) {
              this.keywordErrorMsg='already added';
              this.firstFormGroup = this._formBuilder.group({
                txtKeyword:'',
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
      if(IsUpdate)
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
    this.IsHideUploadDiv=true;
    this.editKeywordObject=value   
    this.firstFormGroup.value.txtKeyword=this.editKeywordObject.VKW_KWORD;
    this.firstFormGroup = this._formBuilder.group({
      txtKeyword: [this.editKeywordObject.VKW_KWORD, Validators.required],
      });
    this.IsEditRow=true;
    this.keywordErrorMsg='';
    setTimeout(()=>{ // this will make the execution after the above boolean has changed
      this.searchElement.nativeElement.focus();
    },0);  
   }


   GetSalesLeadSetup()
   {
    this.salesLeadTempObject=
    {
       "ROW_NO" : 1,
       "VKW_PK" :0,
       "VKW_KWORD" : "",
       "VKW_KWORD_TYPE" : 0,
       "VKW_VENDOR" :0
    }
    this.vendorService.GetSalesLeadSetup(this.salesLeadTempObject).subscribe((data: Array<object>) => {
      this.keywordList = data['Data'];
      this.dataSource = new MatTableDataSource(this.keywordList);
     
   });
   }

   SaveSalesLeadButton()
   {
    this.salesLeadSaveTempObject=
    {
       "ROW_NO" : 1,
       "VKW_PK" :0,
       "VKW_KWORD" : "",
       "VKW_KWORD_TYPE" : 0,
       "VKW_VENDOR" :0
    }
    this.vendorService.SaveSalesLeadSetup(this.salesLeadSaveTempObject).subscribe((data: Array<object>) => {
      this.keywordList = data['Data'];
      this.dataSource = new MatTableDataSource(this.keywordList);
     
   });
   }

get validation() { 
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
// selectUseTypes(e)
// {
//   var groups=1;
//   if(this.selectedSalesUse == 1)
//   {
//       groups=SerachGroup.Personal;
//   }
//   else
//   if(this.selectedSalesUse == 2)
//   {
//       groups=SerachGroup.Business;
//   }
//   if(this.selectedSalesUse == 2)
//   {
//       groups=SerachGroup.Both;
//   }
//   this.selectedSalesUse=e.value;
//   console.log(this.selectedSalesUse);
// }

// selectProductTypes(e)
// {
//   var groups=1;
//   if(this.productSalesUse == 1)
//   {
//       groups=SalesProductGroup.Product;
//   }
//   else
//   if(this.productSalesUse == 2)
//   {
//       groups=SalesProductGroup.Services;
//   }
//   if(this.productSalesUse == 2)
//   {
//       groups=SerachGroup.Both;
//   }
//   this.productSalesUse=e.value;

//   console.log(this.productSalesUse);
// }

// SelectValueTypes(e)
// {
//   var groups=1;
//   if(this.valueSalesUse == 1)
//   {
//       groups=SerachGroup.Personal;
//   }
//   else
//   if(this.valueSalesUse == 2)
//   {
//       groups=SerachGroup.Business;
//   }
//   if(this.valueSalesUse == 2)
//   {
//       groups=SerachGroup.Both;
//   }
//   this.selectedSalesUse=e.value;
  
//   console.log(this.selectedSalesUse);
// }

}
