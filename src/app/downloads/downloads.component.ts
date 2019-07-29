import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss']
})
export class DownloadsComponent implements OnInit {
  daysLeft: number;
  fileName: String;
  pdfUrl: String;
  downloadLink: boolean = false;
  downloadLinkexpired : boolean = true;
  constructor() { }

  ngOnInit() {
    this.DaysLeft();
  }
  DaysLeft() {
    this.daysLeft = 4;
    this.fileName ='enquiry.pdf';
    if (this.daysLeft > 0) {
      this.downloadLink = false;
       this.downloadLinkexpired = true;
     
    }
    else if (this.daysLeft < 1)
    {
       this.downloadLink = true;
       this.downloadLinkexpired = false;
       
     
    }
  }
  clickDownloadButton()
  {
    
  }

}
