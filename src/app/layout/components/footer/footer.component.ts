import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportService } from '../../../services/report/report.service';
import { GlobalUrl } from '../../../utility/GlobalUrl';

@Component({
    selector   : 'footer',
    templateUrl: './footer.component.html',
    styleUrls  : ['./footer.component.scss']
})
export class FooterComponent
{
    enquiryCount:any;
    loginButton:boolean=true;
    /**
     * Constructor
     */
    constructor(private router: Router,private reportService: ReportService,private GlobalUrls: GlobalUrl)
    {
    }
    ngOnInit() {
        this.GetEnquiryCout();
    }
    GetEnquiryCout(){
        var reqObj = {};

        this.reportService.GetEnquiryCout(reqObj).subscribe((data: Array<object>) => {
          this.enquiryCount = data['Data'];
    
    //    console.log(this.enquiryCount );
        });
}

}
