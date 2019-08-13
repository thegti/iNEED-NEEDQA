import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EnquiryService } from '../services/enquiry/enquiry.service';
import { EnquiryDaysLeftModel } from '../business-object/EnquiryObject'

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss']
})
export class DownloadsComponent implements OnInit {
  daysLeft: number;
  fileName: String;
  pdfUrl: String;
  public plans: EnquiryDaysLeftModel[];
  private key: string;
  downloadLink: boolean = false;
  downloadLinkexpired: boolean = true;
  constructor(private router: Router,
    private activeRoute: ActivatedRoute,
    private enquiryService: EnquiryService, ) { }

  ngOnInit() {
    this.DaysLeft();
  }
  DaysLeft() {

    this.activeRoute.params.subscribe(params => {
      this.key = params['key'];
      const reqbody = {
        'VNQ_PDF_ID': this.key
      };

      this.enquiryService.GetPdfDaysLeft(reqbody).subscribe((data: Array<object>) => {

        this.daysLeft = data["Data"][0].NO_OF_DAYS;
        
        if (this.daysLeft == null) {
          this.downloadLink = true;
          this.downloadLinkexpired = false;
        }
        else if (this.daysLeft > 0) {
          this.downloadLink = false;
          this.downloadLinkexpired = true;
        }
        else if (this.daysLeft <= 0 ) {
          this.downloadLink = true;
          this.downloadLinkexpired = false;
        }

      });

    });
  }


  download() {
    this.activeRoute.params.subscribe(params => {
      this.key = params['key'];
      //  console.log('key',this.key)
      this.enquiryService.GetEnquiryPDF(params['key']).subscribe(res => {
        // console.log('res', res);
        //var headers = res.headers;

        var newBlob = new Blob([res], { type: "application/pdf" });
        // console.log(newBlob);

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(newBlob);
          return;
        }

        // For other browsers: 
        // Create a link pointing to the ObjectURL containing the blob.
        const data = window.URL.createObjectURL(newBlob);

        var link = document.createElement('a');
        link.href = data;
        link.download = "enquiry.pdf";
        // this is necessary as link.click() does not work on the latest firefox
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

        setTimeout(function () {
          // For Firefox it is necessary to delay revoking the ObjectURL
          window.URL.revokeObjectURL(data);
        }, 100);
        setTimeout(() => {
          // For Firefox it is necessary to delay revoking the ObjectURL
          this.enquiryService.DeleteEnquiryPDF(params['key']).subscribe(res => {
          })
        }, 200);

      }, error => {
        // console.log(error);
      })
    });
  }
}
