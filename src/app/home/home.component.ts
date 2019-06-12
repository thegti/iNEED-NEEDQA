import { Component, OnInit } from '@angular/core';
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
import { FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
import {AuthService} from '../authentication/auth.service';
import {DialogComponent} from '../dialog/dialog.component';


export interface Food {
    value: string;
    viewValue: string;
  }
  
  

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
        foods: Food[] = [
          {value: 'steak-0', viewValue: 'Steak'},
          {value: 'pizza-1', viewValue: 'Pizza'},
          {value: 'tacos-2', viewValue: 'Tacos'}
        ];

    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    DialogRef: MatDialogRef<DialogComponent>;
    public locationFilterCtrl: FormControl = new FormControl();
    public filteredLocation: ReplaySubject<Array<any>> = new ReplaySubject<Array<any>>(1);
    form: FormGroup;
    next:boolean=true;
    isFirst: boolean=true;
    selectedfile: File;
    enableNext: Boolean;
    imgname: any = '';
    imgChange: Boolean = false;
    formdt: FormData = new FormData();
    
    // checked = false;
    // indeterminate = false;
    url = '../../assets/loginasset/images/display-img.jpg';
    moddate: any;
    isView: Boolean = false;
    selectedFiles: FileList;
    fileName: string;
    enableclose: Boolean = false;
    locationrequest = {};
    // location:  Array<object> = [];
    location: Array<Object> = [{
        'CON_NAME': 'Search',
        'CON_PK': 0
    
     }];
    searchDataNull = {
        'CON_NAME': '--Select--',
          'CON_PK': 0
    
       };
    // const: any = [];
  
  /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,private apiService: ApiService,private authService: AuthService,public _matDialog: MatDialog,  private _formBuilder: FormBuilder,private act_route: ActivatedRoute
    )
    {
         this._fuseTranslationLoaderService.loadTranslations(english, turkish,arabic);
    }

  ngOnInit() {
   
//     this.form = new FormGroup({
//         captcha:new FormControl ('', Validators.required),
//    });
    this.form = this._formBuilder.group({
    ddlLocation: [null],
    captcha: ['', Validators.required],
    });
    this.isFirst=true;
    this.buttonNext();
    this.locationFilterCtrl.valueChanges
    .subscribe(() => {
      this.filterLocation();
    });
  this.ConstGetAuto();
  }
 
  buttonPrevious()
  {
    this.isFirst=true;
     this.next=false; 
 
  }
  buttonNext()
  {
      this.isFirst=false;
     this.next=true; 

   
  }
  
  button()
  {
    this.next=false;  
    this.isFirst=true;
 
   
  }
  forSubmit(value): void {
    this.next=false;  
    this.isFirst=true;
    this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
        disableClose: false
    });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Thank you for submitting your requirment.You will be contacted soon, a copy of your requirment is shared in your email.';

    // this.confirmDialogRef.afterClosed().subscribe(result => {
    //     if ( result )
    //     {

       
    //     this.DialogRef.componentInstance.Message = 'Record Deleted Successfully';
    // }
    // });
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


ConstGetAuto(): any {
    this.filteredLocation.next(this.location.slice());
//     this.apiService.ConstGetAuto(reqbody).subscribe((data: Array<object>) => {
//         this.location = data['Data'];
//         this.filteredLocation.next(this.location.slice());
      
//   });

  }

private filterLocation(): void{
  
    let search = this.locationFilterCtrl.value;
    if (!search) {
   
     this.filteredLocation.next(this.location.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    const reqbody = {
        'CON_PK': 1,
        'AUTO_SEARCH': search
     };
     this.apiService.ConstGetAuto(reqbody).subscribe((data: Array<object>) => {
        this.location = data['Data'];
        console.log(' this.members');
        console.log(this.location);
         this.location.splice(0,0,this.searchDataNull);
         this.filteredLocation.next(this.location);
     });
 
  
}






//    private filterLocation(): void {

//     let search = this.locationFilterCtrl.value;
//     if (!search) {
   
//      this.filteredLocation.next(this.location.slice());
//       return;
//     } else {
//       search = search.toLowerCase();
//     }
//     const reqbody = {
//          'CON_NAME ': search,
//           'CON_GROUP ': 1
//      };
     
//      this.apiService.ConstGetAuto(reqbody, this.header).subscribe(location => {
//          this.location = location['Data'];
//          console.log('location');
//          console.log(this.location);
//          this.filteredLocation.next(this.location);
//      });

 
// }
selectSearch(val: object ) {
    console.log(val);
}

selectLocation(value: object ) {
    console.log(value);
    // this.ConstGetAuto();
}
resolved(captchaResponse: string) {
   
    console.log(captchaResponse);
 
   
     
      
    
}


}
