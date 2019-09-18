import { Component, ViewChild } from '@angular/core';
import { WebDataRocksPivot } from "../WebDataRocks/webdatarocks.angular4";
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ApiService } from '../../services/common/common.service';
import { User } from '../../authentication/user.model';
import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {

  enableSearch: Boolean = false;
  makesearch: Boolean = false;
  stprMain: FormGroup;
  isdate: Boolean = false;
  isdatechange: Boolean = false;
  user: User;
  reportList: Array<Object>;
  keywordList: Array<Object>;



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
    private _formBuilder: FormBuilder, private apiService: ApiService, public authService: AuthService,
  ) { }

  ngOnInit() {
    this.user = this.authService.getUserDetail();
    this.stprMain = this._formBuilder.group({
      ddlVendorName: [null],
      ddlVendorKeyword: [null],
      txtFromDob: [null],
      txtToDob: [null],

    });
    this.GetReports();

  }
  enbleSearch(): any {
    this.enableSearch = true;
    this.makesearch = false;
  }
  onChange(event): void {
    if (event.value == null) {
      this.isdate = true;
    }
  }
  onDateChange(event): void {
    if (event.value == null) {
      this.isdatechange = true;
    }
  }
  filterReports(): void {
    this.enableSearch = false;
    var reqObj = {
      "VND_PK": this.user.VND_PK,
      'FROM_DATE': this.stprMain.value.txtFromDob,
      'TO_DATE': this.stprMain.value.txtToDob,
    };
    //console.log(reqObj);
    this.apiService.GetVendorKeywords(reqObj).subscribe((data: Array<object>) => {
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
    });

  }

}

