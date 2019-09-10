import { Component } from '@angular/core';
import { ApiService } from '../services/common/common.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, FormGroupName, FormGroupDirective, NgForm, ValidatorFn } from '@angular/forms';
import { SerachGroup } from '../utility/SearchConstants';
import { environment } from 'environments/environment';
import { Observable,ReplaySubject } from 'rxjs';
import { KeywordModel } from '../business-object/CommonDataObject';
import { map, startWith } from 'rxjs/operators';
import { Subject } from 'rxjs/subject';



@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})

export class TestComponent {
  public selectedKeyword: any;
  IsValidOtp: boolean = false;
  next: boolean = true;
    isFirst: boolean = true;
  selectKeywordValue: number;
  firstFormGroup: FormGroup;
  public selectedText: String;
  private result = new Subject<boolean>();
  venkeywords: KeywordModel[];
  // public filteredSearch: ReplaySubject<Array<any>> = new ReplaySubject<Array<any>>(1);
  filteredSearch: Observable<KeywordModel[]>;
  public searchFilterCtrl = new FormControl();

  // public searchFilterCtrl: FormControl = new FormControl();
  constructor(private _formBuilder: FormBuilder, private apiService: ApiService, ) {
    this.searchFilterCtrl.valueChanges
    .subscribe(() => {
        this.filterSerach();
    });
  }
  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({

      ddlsearch: ['', Validators.required],
    });
    // this.searchFilterCtrl.valueChanges
    // .subscribe(() => {
    //     this.filterSerach();
    // });
    this.getKeyword();
  }


  getKeyword(): any {
  //  this.filteredSearch.next(this.venkeywords.slice());
  }
  private filterSerach(): void {
     let search = this.searchFilterCtrl.value;
     var groups = 1;
     if (this.selectedKeyword == 1) {
      groups = SerachGroup.Product;
     }
    else
      if (this.selectedKeyword == 2) {
        groups = SerachGroup.Services;
      }
    var reqbody = {
      'VKW_KWORD_TYPE': groups,
      'AUTO_SEARCH': search
    };

    this.apiService.KeyWordGetAuto(reqbody).subscribe((data: Array<object>) => {
      this.venkeywords = data['Data'];
    });
  }
 
  SelectKeyword(e)
  {
    this.selectKeywordValue=e;
    var keyword = this.venkeywords.find(x=>x.VKW_PK==  this.selectKeywordValue).VKW_KWORD;
    this.firstFormGroup.controls['ddlsearch'].setValue(keyword);
    
  }

  EnableNextButton() {

    if (this.selectedKeyword) {

        if (!this.IsValidOtp) {


            // console.log('test',reqbody);
    ;
        }
        else {
            this.next = false;
            this.isFirst = true;
          
        }
    }
    else {
       

    }
}

}
