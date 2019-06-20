import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import { v4 as uuid } from 'uuid';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, FormGroupName} from '@angular/forms';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {VendorKeywordModel} from '../business-object/VendorObject';
import { VendorService } from '../services/vendor/vendor.service';


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
  tempObject: VendorKeywordModel;
  tempAddObject: VendorKeywordModel;
  editKeywordObject : VendorKeywordModel;
  firstFormGroup: FormGroup;
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

  constructor(private _formBuilder: FormBuilder,private vendorService: VendorService,) {
    
   }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
  
      txtKeyword: ['', Validators.required],
     
      });
    this.filenames=true;   
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
       "VKW_KWORD_TYPE" : 1,
       "VKW_VENDOR" : 1
    }
    this.vendorService.VendorKeywordGet(this.tempObject).subscribe((data: Array<object>) => {
      this.keywordList = data['Data'];
      this.dataSource = new MatTableDataSource(this.keywordList);
     
   });

    // this.keywordList.push( this.tempObject);
    // this.keywordList.push( this.tempObject);
 
  
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
          "VKW_KWORD_TYPE" : 1, //Need to change
          "VKW_VENDOR" : 1 // need to change
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

 
 
 
}
