import { Component, ViewChild } from '@angular/core';
import { WebDataRocksPivot } from "../WebDataRocks/webdatarocks.angular4";
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ApiService } from '../../services/common/common.service';
import { ReportService } from '../../services/report/report.service';
import { User } from '../../authentication/user.model';
import { AuthService } from '../../authentication/auth.service';
import { VendorService } from '../../services/vendor/vendor.service';
import { ReportModel } from '../../business-object/CommonDataObject';
import { ReplaySubject } from 'rxjs';
import { GlobalUrl } from '../../utility/GlobalUrl';



@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {

  // enableSearch: Boolean = false;
  stprMain: FormGroup;
  isdate: Boolean = false;
  isdatechange: Boolean = false;
  user: User;
  reportList: Array<Object>;
  planList: Array<Object>;
  keywordList: Array<Object>;
  referalMerchantList: Array<Object>;
  referalAdminList: Array<Object>;
  selectValue: number;
  selectedReport: number;
  reportFromDate: boolean = false;
  ReportVendorName: boolean = false;
  ReportPlanName: boolean = false;
  toggleReport: boolean = false;
  dateFormat: string;
  // date: Date;

  public VendorNameFilterCtrl: FormControl = new FormControl();
  public filteredVendorName: ReplaySubject<Array<any>> = new ReplaySubject<Array<any>>(1);
  vendorname: Array<Object> = [{
    // 'VND_NAME_TEXT': 'Search',
    'VND_NAME': 'Search',
  }];
  vendorNameDataNull = {
    // 'VND_NAME_TEXT': '--Select--',
    'VND_NAME': '--Select--',
  }


  @ViewChild('pivot1') child: WebDataRocksPivot;
  //Ref: https://www.webdatarocks.com/doc/integration-with-angular/

  title = 'ReportDemo';
  onPivotReady(pivot: WebDataRocks.Pivot): void {
    // console.log("[ready] WebDataRocksPivot", this.child);
  }
  reportData: string;

  onCustomizeCell(cell: WebDataRocks.CellBuilder, data: WebDataRocks.Cell): void {
    //console.log("[customizeCell] WebDataRocksPivot");
    if (data.isClassicTotalRow) cell.addClass("fm-total-classic-r");
    if (data.isGrandTotalRow) cell.addClass("fm-grand-total-r");
    if (data.isGrandTotalColumn) cell.addClass("fm-grand-total-c");
  }

  onReportComplete(): void {


  }

  constructor(
    private _formBuilder: FormBuilder, private apiService: ApiService, public authService: AuthService, private reportService: ReportService, private vendorService: VendorService, private GlobalUrls: GlobalUrl,
  ) {
  }

  ngOnInit() {


    this.user = this.authService.getUserDetail();
    this.formControlsValidation();

    this.GetReports();
    this.GetPlan();
    this.getVendorText();
    this.VendorNameFilterCtrl.valueChanges
      .subscribe(() => {
        this.filterVendorSerach();
      });

  }
  formControlsValidation() {
    this.stprMain = this._formBuilder.group({
      ddlReport: ['', Validators.required,],
      ddlVendorName: [null],
      ddlVendorKeyword: [null],
      txtFromDate: new FormControl(new Date(new Date().getFullYear(),
        new Date().getMonth(), 1, // 1 moth starting the current date
        new Date().getDate())),
      txtToDate: new FormControl(new Date()), // Current Date
      ddlVendorPlan: [null],
    });
  }

  EnbleSearch(): any {
    // this.enableSearch = true;
    // this.reportFromDate = false;
    // this.ReportVendorName = false;
    // this.ReportPlanName = false;
    // this.formControlsValidation();
    this.toggleReport = !this.toggleReport;
  }

  get formControls() { return this.stprMain.controls; }

  GetReports() {
    if (this.user.ROL_PK == 1) {
    
      var reqObj = { 'RPT_TYPE': 2 };
    
    }
    else {
      var reqObj = { 'RPT_TYPE': 1 };
     
    }
    this.apiService.GetReports(reqObj).subscribe((data: Array<object>) => {
      this.reportList = data['Data'];


    });

  }
  GetPlan() {

    var reqObj = {};

    this.apiService.GetPlan(reqObj).subscribe((data: Array<object>) => {
      this.planList = data['Data'];


    });

  }


  filterReports(): void {

    this.selectValue = this.stprMain.value.ddlReport;

    // console.log(this.selectValue);


    switch (this.selectValue) {
      case 1:
        //key word list-merchantwise
        this.VendorKeywordReport();
        break;
      case 2:
        // total number of referrals-merchantwise
        this.TotalReferalsMerchantReport();

        break;
      case 3:
        // total number of referrals-adminwise
        this.TotalReferalsAdminReport();

        break;
      case 4:
        // key word list-adminwise
        this.AdminKeywordReport();
        

        break;
      case 5:
        // list of merchants-planwise
        this.PlanwiseCompanyReport();

        break;
      case 6:
        // list of inactive merchants

        break;
      case 7:
        // list of merchants ( with subscription near  expiry -7 days)

        break;
      case 8:
        // merchants directory
        this.VendorDirectoryReport();

        break;


    }
    // this.enableSearch = true;
    this.onReportSelect();
    // this.reportFromDate = false;
    // this.ReportVendorName = false;
    // this.ReportPlanName = false;
    this.toggleReport = false;
  }

  onReportSelect() {
    this.selectedReport = this.stprMain.value.ddlReport;

    switch (this.selectedReport) {
      case 1:

        this.reportFromDate = true;
        this.ReportVendorName = false;
        this.ReportPlanName = false;

        //key word list-merchantwise

        break;
      case 2:
        // total number of referrals-merchantwise
        this.reportFromDate = true;
        this.ReportVendorName = false;
        this.ReportPlanName = false;

        break;
      case 3:
        // total number of referrals-adminwise
        this.ReportVendorName = true;
        this.reportFromDate = false;
        this.ReportPlanName = false;

        break;
      case 4:
        // key word list-adminwise
        this.reportFromDate = true;
        this.ReportVendorName = true;
        this.ReportPlanName = false;

        break;
      case 5:
        // list of merchants-planwise
        this.reportFromDate = false;
        this.ReportVendorName = true;
        this.ReportPlanName = true;

        break;
      case 6:
        // list of inactive merchants
        this.reportFromDate = false;
        this.ReportVendorName = false;
        this.ReportPlanName = false;

        break;
      case 7:
        // list of merchants ( with subscription near  expiry -7 days)
        this.ReportVendorName = true;
        this.reportFromDate = false;
        this.ReportPlanName = false;

        break;
      case 8:
        // merchants directory
        this.ReportVendorName = true;
        this.reportFromDate = false;
        this.ReportPlanName = false;


        break;
    }
  }
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

  VendorKeywordReport() {
    var reqObj = {
      // "VND_PK": this.user.VND_PK,

      'FROM_DATE': this.GlobalUrls.ConvertDate(this.stprMain.value.txtFromDate),
      'TO_DATE': this.GlobalUrls.ConvertDate(this.stprMain.value.txtToDate),
    };

    this.reportService.GetVendorKeywords(reqObj).subscribe((data: Array<object>) => {
      this.keywordList = data['Data'];
      this.BindReportVendorKeywords(this.keywordList);
    });
  }


  BindReportVendorKeywords(rptdata) {
    this.child.webDataRocks.off("reportcomplete");
    this.child.webDataRocks.setReport({
      options: { grid: { showFilter: false, showHierarchyCaptions: true } },
      dataSource: {
        data: rptdata
      },
      slice: {
        rows: [
          {
            uniqueName: "KEYWORD",
            caption: "Keywords."
          }
        ],
        columns: [
          {
            uniqueName: "Measures"
          }
        ],
        measures: [{
          uniqueName: "LEADS_COUNT",
          //aggregation: "sum",
          grandTotalCaption: "Leads Count"
        }],
      }
    });

  }


  TotalReferalsMerchantReport() {

    var reqObj = {
      'FROM_DATE': this.GlobalUrls.ConvertDate(this.stprMain.value.txtFromDate),
      'TO_DATE': this.GlobalUrls.ConvertDate(this.stprMain.value.txtToDate),
    };

    this.reportService.GetTotalReferals(reqObj).subscribe((data: Array<object>) => {
      console.log(reqObj);
      this.referalMerchantList = data['Data'];
      console.log(this.referalMerchantList);
      this.BindReportReferalsMerchant(this.referalMerchantList);
    });
  }
  BindReportReferalsMerchant(rptdata) {
    this.child.webDataRocks.off("reportcomplete");
    this.child.webDataRocks.setReport({
      options: { grid: { showFilter: false, showHierarchyCaptions: true } },
      dataSource: {
        data: rptdata
      },
      slice: {
        rows: [
          {
            uniqueName: "KEYWORD",
            caption: "Keywords."
          }
        ],
        columns: [
          {
            uniqueName: "Measures"
          }
        ],
        measures: [{
          uniqueName: "LEADS_COUNT",
          //aggregation: "sum",
          grandTotalCaption: "Leads Count"
        }],
      }
    });

  }
  TotalReferalsAdminReport() {
    var reqObj = {
      'FROM_DATE': this.GlobalUrls.ConvertDate(this.stprMain.value.txtFromDate),
      'TO_DATE': this.GlobalUrls.ConvertDate(this.stprMain.value.txtToDate),

    };

    this.reportService.GetTotalReferalsAdmin(reqObj).subscribe((data: Array<object>) => {
      this.referalAdminList = data['Data'];
      this.BindReportReferalsAdmin(this.referalAdminList);
    });
  }
  BindReportReferalsAdmin(rptdata) {
    this.child.webDataRocks.off("reportcomplete");
    this.child.webDataRocks.setReport({
      options: { grid: { showFilter: false, showHierarchyCaptions: true } },
      dataSource: {
        data: rptdata
      },
      slice: {
        rows: [
          {
            uniqueName: "KEYWORD",
            caption: "Keywords."
          }
        ],
        columns: [
          {
            uniqueName: "Measures"
          }
        ],
        measures: [{
          uniqueName: "LEADS_COUNT",
          //aggregation: "sum",
          grandTotalCaption: "Leads Count"
        }],
      }
    });

  }
  VendorDirectoryReport() {
    var reqObj = { 'VND_PK': 1 };
    
    this.reportService.GetVendorDirectory(reqObj).subscribe((data: Array<object>) => {
      this.referalAdminList = data['Data'];
      console.log('dat',this.referalAdminList);
      this.BindReportVendorDirectory(this.referalAdminList);
    });
  }
  BindReportVendorDirectory(rptdata) {
    this.child.webDataRocks.off("reportcomplete");
    this.child.webDataRocks.setReport({
      options: { grid: { showFilter: false, showHierarchyCaptions: true } },
      dataSource: {
        data: rptdata
      },
      slice: {
        rows: [
          {
            uniqueName: "KEYWORD",
            caption: "Keywords."
          }
        ],
        columns: [
          {
            uniqueName: "Measures"
          }
        ],
        measures: [{
          uniqueName: "LEADS_COUNT",
          //aggregation: "sum",
          grandTotalCaption: "Leads Count"
        }],
      }
    });

  }


  AdminKeywordReport() {
    var reqObj = {
      "VND_PK": 1,
      'FROM_DATE': this.GlobalUrls.ConvertDate(this.stprMain.value.txtFromDate),
      'TO_DATE': this.GlobalUrls.ConvertDate(this.stprMain.value.txtToDate),
    };

    this.reportService.GetKeywordListAdmin(reqObj).subscribe((data: Array<object>) => {
      this.keywordList = data['Data'];
      this.BindReportAdminKeyword(this.keywordList);
    });
  }
  BindReportAdminKeyword(rptdata) {
    this.child.webDataRocks.off("reportcomplete");
    this.child.webDataRocks.setReport({
      options: { grid: { showFilter: false, showHierarchyCaptions: true } },
      dataSource: {
        data: rptdata
      },
      slice: {
        rows: [
          {
            uniqueName: "KEYWORD",
            caption: "Keywords."
          }
        ],
        columns: [
          {
            uniqueName: "Measures"
          }
        ],
        measures: [{
          uniqueName: "LEADS_COUNT",
          //aggregation: "sum",
          grandTotalCaption: "Leads Count"
        }],
      }
    });

  }

  PlanwiseCompanyReport() {
    var reqObj = {
      "PLN_PK": 9,
      "VND_PK": 1
    };

    this.reportService.GetPlanwiseCompany(reqObj).subscribe((data: Array<object>) => {
      this.keywordList = data['Data'];
      this.BindReportPlanwiseCompany(this.keywordList);
    });
  }
  BindReportPlanwiseCompany(rptdata) {
    this.child.webDataRocks.off("reportcomplete");
    this.child.webDataRocks.setReport({
      options: { grid: { showFilter: false, showHierarchyCaptions: true } },
      dataSource: {
        data: rptdata
      },
      slice: {
        rows: [
          {
            uniqueName: "KEYWORD",
            caption: "Keywords."
          }
        ],
        columns: [
          {
            uniqueName: "Measures"
          }
        ],
        measures: [{
          uniqueName: "LEADS_COUNT",
          //aggregation: "sum",
          grandTotalCaption: "Leads Count"
        }],
      }
    });

  }

}

