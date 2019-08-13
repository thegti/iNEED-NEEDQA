import { Component, ViewChild } from '@angular/core';
import { WebDataRocksPivot } from "../WebDataRocks/webdatarocks.angular4";


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {

  @ViewChild('pivot1') child: WebDataRocksPivot;
  //Ref: https://www.webdatarocks.com/doc/integration-with-angular/
  
    title = 'ReportDemo';
    onPivotReady(pivot: WebDataRocks.Pivot): void {
      console.log("[ready] WebDataRocksPivot", this.child);
  }
  onCustomizeCell(cell: WebDataRocks.CellBuilder, data: WebDataRocks.Cell): void {
    //console.log("[customizeCell] WebDataRocksPivot");
    if (data.isClassicTotalRow) cell.addClass("fm-total-classic-r");
    if (data.isGrandTotalRow) cell.addClass("fm-grand-total-r");
    if (data.isGrandTotalColumn) cell.addClass("fm-grand-total-c");
  }
  
  onReportComplete(): void {
  this.child.webDataRocks.off("reportcomplete");
  this.child.webDataRocks.setReport({options:{ grid:{ showFilter:false,showHierarchyCaptions:false} },
    dataSource: {
      filename: "https://cdn.webdatarocks.com/data/data.json"
    },
        slice: { 
          rows: [{
                  uniqueName: "Color", 
              },
              {
                  uniqueName: "Destination"
              },
              {
                  uniqueName: "Business Type"
              },
              {
                  uniqueName: "Country"
              },
              {
                  uniqueName: "Price"
              }
          ], 
          columns:[
            {
              uniqueName: "Country"
            },
            {
                uniqueName: "Measures"
            }
          ],
          measures:[{
            uniqueName: "Price",
            aggregation: "sum"
        }],  },

        
  });
  }
  }
  
