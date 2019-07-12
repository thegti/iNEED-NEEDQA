import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { GlobalUrl } from '../utility/GlobalUrl';
import { DialogComponent } from '../dialog/dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { ReplaySubject } from 'rxjs';
import { ApiService } from '../services/common/common.service';
import { VendorService } from '../services/vendor/vendor.service';
import { VendorNameModel } from 'app/business-object/VendorObject';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { User } from '../authentication/user.model';
import { AuthService } from '../authentication/auth.service';



@Component({
  selector: 'app-vendorlisting',
  templateUrl: './vendorlisting.component.html',
  styleUrls: ['./vendorlisting.component.scss']
})
export class VendorlistingComponent implements OnInit {
  displayedColumns: string[] = ['VND_NAME ', 'VND_CITY', 'VPL_VALID_DATE_TO ', 'KWORD_COUNT', 'VND_STATUS', 'Edit'];
  dataSource: MatTableDataSource<VendorNameModel>;
  vendorlist: VendorNameModel[];
  stprMain: FormGroup;
  enableSearch: Boolean = false;
  makesearch: Boolean = false;
  vndKeyWord: String = null;
  pageNo = 1;
  enableAll: Boolean = false;
  showPagination: boolean = false;
  totalPages: number;
  disableprev: Boolean = true;
  disablenext: Boolean = true;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  DialogRef: MatDialogRef<DialogComponent>;
  public VendorNameFilterCtrl: FormControl = new FormControl();
  public VendorKeywordFilterCtrl: FormControl = new FormControl();
  public filteredVendorName: ReplaySubject<Array<any>> = new ReplaySubject<Array<any>>(1);
  public filteredVendorKeyword: ReplaySubject<Array<any>> = new ReplaySubject<Array<any>>(1);
  keywordVendor: Array<object> = [];
  VendorGetList: any;
  user: User;
  vendorname: Array<Object> = [{
    'VND_NAME_TEXT': 'Search',
  }];
  keyword: Array<Object> = [{
    'VKW_KWORD': 'Search',
  }];
  vendorNameDataNull = {
    'VND_NAME_TEXT': '--Select--',
  }
  keywordDataNull = {
    'VKW_KWORD': '--Select--',
  }
  vendorgetlistrequest = {
    'PAGE_NO': 1,
    'PAGE_SIZE': this.GlobalUrls.pageSize,
    'USER_PK': 1,
    'VND_NAME_TEXT ': null,
    'VKW_KWORD': null,
  };

  constructor(private apiService: ApiService,
    private vendorService: VendorService,
    private _formBuilder: FormBuilder,
    private _fuseSidebarService: FuseSidebarService,
    public _matDialog: MatDialog,
    private router: Router,
    private GlobalUrls: GlobalUrl,
    private authService: AuthService, ) { }

  ngOnInit() {
    this.stprMain = this._formBuilder.group({
      ddlVendorName: [null],
      ddlVendorKeyword: [null]

    });
    this.user = this.authService.getUserDetail();
    this.pageNo = 1;
    this.disableprev = true;
    this.VendorKeywordFilterCtrl.valueChanges
      .subscribe(() => {
        this.filterKeywordSerach();
      });
    this.VendorNameFilterCtrl.valueChanges
      .subscribe(() => {
        this.filterVendorSerach();
      });
    this.getKeyword();
    this.getVendorText();
    this.GetVendorList(this.vendorgetlistrequest);

  }

  //Vendor Name get auto

  getVendorText(): any {
    this.filteredVendorName.next(this.vendorname.slice());
  }

  private filterVendorSerach(): void {
    let search = this.VendorNameFilterCtrl.value;
    if (!search) {
      this.filteredVendorName.next(this.vendorname.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }

    var reqbody = {

      'AUTO_SEARCH': search
    };
    this.vendorService.VendorNameGetAuto(reqbody).subscribe((data: Array<object>) => {
      this.vendorname = data['Data'];
      this.vendorname.splice(0, 0, this.vendorNameDataNull);
      this.filteredVendorName.next(this.vendorname);
    });
  }

  //Keyword get auto
  getKeyword(): any {
    this.filteredVendorKeyword.next(this.keyword.slice());
  }

  private filterKeywordSerach(): void {
    let search = this.VendorKeywordFilterCtrl.value;
    if (!search) {
      this.filteredVendorKeyword.next(this.keyword.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }

    var reqbody = {

      'AUTO_SEARCH': search
    };

    this.apiService.KeyWordGetAuto(reqbody).subscribe((data: Array<object>) => {
      this.keyword = data['Data'];
      this.keywordVendor = this.keyword;
      this.keyword.splice(0, 0, this.keywordDataNull);
      this.filteredVendorKeyword.next(this.keyword);

    });
  }


  // Get vendor list in grid

  public GetVendorList(reqObj): void {
    this.vendorService.GetVendorList(reqObj).subscribe((data: Array<object>) => {
      this.vendorlist = data['Data'];
      this.totalPages = this.vendorlist[0].TOTAL_ROW_COUNT / this.GlobalUrls.pageSize;
      if (this.totalPages > 1)
        this.showPagination = true;
      else
        this.showPagination = false;
      this.dataSource = new MatTableDataSource(this.vendorlist);
    });

    reqObj = {

      'PAGE_NO': this.pageNo + 1,
      'PAGE_SIZE': this.GlobalUrls.pageSize,
      'USER_PK': 1,
      'VND_NAME_TEXT ': this.stprMain.value.ddlVendorName,
      'VKW_KWORD': this.stprMain.value.ddlVendorKeyword,
    };

    this.vendorService.GetVendorList(reqObj).subscribe((data: Array<object>) => {
      if (data['Data'] === null) {
        this.disablenext = true;
      } else {
        this.disablenext = false;
      }

    });
  }
  nextPage(): any {
    this.pageNo += 1;
    this.disableprev = false;
    var reqObj = {

      'PAGE_NO': this.pageNo,
      'PAGE_SIZE': this.GlobalUrls.pageSize,
      'USER_PK': 1,
      'VND_NAME_TEXT ': this.stprMain.value.ddlVendorName,
      'VKW_KWORD': this.stprMain.value.ddlVendorKeyword,
    };

    this.GetVendorList(reqObj);

  }
  previousPage(): any {
    this.pageNo -= 1;
    this.disablenext = false;
    if (this.pageNo < 2) {
      this.disableprev = true;
    }
    var reqObj = {
      'PAGE_NO': this.pageNo,
      'PAGE_SIZE': this.GlobalUrls.pageSize,
      'USER_PK': 1,
      'VND_NAME_TEXT ': this.stprMain.value.ddlVendorName,
      'VKW_KWORD': this.stprMain.value.ddlVendorKeyword,
    };
    this.GetVendorList(reqObj);

  }

  getAllVendors() {
    this.pageNo -= 1;
    this.disableprev = false;

    var reqObj = {
      'PAGE_NO': this.pageNo,
      'PAGE_SIZE': this.GlobalUrls.pageSize,
      'USER_PK': 1,
      'VND_NAME_TEXT ': this.stprMain.value.ddlVendorName,
      'VKW_KWORD': this.stprMain.value.ddlVendorKeyword,
    };
    this.enableSearch = false;
    this.GetVendorList(reqObj);
    this.enableAll = false;
  }
  enbleSearch(): any {
    this.enableSearch = true;
    this.makesearch = false;
  }
  closeFun(): any {
    this.enableSearch = false;
    this.stprMain.reset();
    this.pageNo = 1;
    this.disableprev = true;
    var reqObj = {
      'PAGE_NO': this.pageNo,
      'USER_PK': 1,
      'PAGE_SIZE': this.GlobalUrls.pageSize,
      'VND_NAME_TEXT ': null,
      'VKW_KWORD': null,
    };

    this.GetVendorList(reqObj);
  }

  filterMembers(): void {
    this.pageNo = 1;
    this.disableprev = true;
    this.vndKeyWord = null;
    let resultObj = this.keywordVendor.find(x => x['VKW_PK'] === this.stprMain.value.ddlVendorKeyword);
    if (resultObj) {
      if (resultObj["VKW_KWORD"] != "--Select--")
        this.vndKeyWord = resultObj["VKW_KWORD"];
    }
    var reqObj = {
      'PAGE_NO': this.pageNo,
      'PAGE_SIZE': this.GlobalUrls.pageSize,
      'USER_PK': 1,
      'VND_PK': this.stprMain.value.ddlVendorName,
      'VKW_KWORD': this.vndKeyWord,
    };
    this.GetVendorList(reqObj);
    this.enableSearch = false;
    this.enableAll = true;
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  forEdit(value): any {
    var vendorPK = value["VND_PK"];
    this.authService.ChangeVendorID(vendorPK).then(() => {
      this.router.navigate(['/vendorprofile/']);
    });

    // another method  using observable subscribe
    //   var vendorPK=value["VND_PK"];
    //   this.authService.SetVendorID(vendorPK).subscribe(()=> {
    //     this.router.navigate(['/vendorprofile/' ]);
    // });


  }
}
