import { Component, ViewChild } from '@angular/core';
import { WebDataRocksPivot } from "../../reportModule/WebDataRocks/webdatarocks.angular4";
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ApiService } from '../../services/common/common.service';
import { ReportService } from '../../services/report/report.service';
import { User } from '../../authentication/user.model';
import { AuthService } from '../../authentication/auth.service';
import { ReportModel } from '../../business-object/CommonDataObject';


@Component({
  selector: 'app-datereport',
  templateUrl: './datereport.component.html',
  styleUrls: ['./datereport.component.scss']
})
export class DatereportComponent {
  enableSearch: Boolean = false;
  makesearch: Boolean = false;
  stprMain: FormGroup;
  isdate: Boolean = false;
  isdatechange: Boolean = false;
  user: User;
  reportList: Array<Object>;
  keywordList: Array<Object>;
  selectValue: number;
  // date: Date;

  



  @ViewChild('pivot1') child: WebDataRocksPivot;
  //Ref: https://www.webdatarocks.com/doc/integration-with-angular/

  title = 'ReportDemo';
  onPivotReady(pivot: WebDataRocks.Pivot): void {
    console.log("[ready] WebDataRocksPivot", this.child);
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
    private _formBuilder: FormBuilder, private apiService: ApiService, public authService: AuthService, private reportService: ReportService,
  ) {
    // Set the default date
    // this.date = new Date();
   
    

  }

  ngOnInit() {
    this.user = this.authService.getUserDetail();
    this.stprMain = this._formBuilder.group({
      ddlReport: [],
      ddlVendorName: [null],
      ddlVendorKeyword: [null],
      txtFromDob: [null],
      
      txtToDob: new FormControl(new Date()), // Current Date
      
      

    });
    this.GetReports();



  }
 
  enbleSearch(): any {
    this.enableSearch = true;
    this.makesearch = false;
  }
  // setDate(): void {
  //   // Set today date using the patchValue function
  //   let date = new Date();
  //   this.stprMain.patchValue({
  //     myDate: {
  //       date: {
  //         year: date.getFullYear(),
  //         month: date.getMonth() + 1,
  //         day: date.getDate()
  //       }
  //     }
  //   });
  // }

  // clearDate(): void {
  //   // Clear the date using the patchValue function
  //   this.stprMain.patchValue({ myDate: null });
  // }
  onChange(event): void {
    if (event.value == null) {
      this.isdate = true;
    }
  }
  // onDateChange(event): void {
  //   if (event.value == null) {
  //     this.isdatechange = true;
  //   }
  // }
  filterReports(): void {

    this.selectValue = this.stprMain.value.ddlReport;

    // console.log(this.selectValue);


    switch (this.selectValue) {
      case 1:
        //key word list-merchantwise
        break;

      case 2:
        // total number of referrals-merchantwise

        break;
      case 3:
        // total number of referrals-adminwise

        break;
      case 4:
        // key word list-adminwise

        break;
      case 5:
        // list of merchants-planwise

        break;
      case 6:
        // list of inactive merchants

        break;
      case 7:
        // list of merchants ( with subscription near  expiry -7 days)

        break;
      case 8:
        // merchants directory

        break;


    }
    this.enableSearch = false;
    var reqObj = {
      "VND_PK": this.user.VND_PK,
      'FROM_DATE': this.stprMain.value.txtFromDob,
      'TO_DATE': this.stprMain.value.txtToDob,
    };
    //console.log(reqObj);
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
  GetReports() {

    if (this.user.ROL_PK == 1) {
      var reqObj = { 'RPT_TYPE': 1 };


    }
    else {
      var reqObj = { 'RPT_TYPE': 2 };
    }

    this.apiService.GetReports(reqObj).subscribe((data: Array<object>) => {
      this.reportList = data['Data'];
      console.log(this.reportList);

    });

  }

}

