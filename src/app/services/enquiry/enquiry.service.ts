import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { GlobalUrl } from '../../utility/GlobalUrl';
import { AuthService } from '../../authentication/auth.service';
import { environment } from 'environments/environment';
import { SavaEnquiryModel } from '../../business-object/EnquiryObject';
import { Observable, ReplaySubject } from 'rxjs';
import { EnquiryDaysLeftModel } from '../../business-object/EnquiryObject';



@Injectable({
  providedIn: 'root'
})
export class EnquiryService {
  header = { headers: { Authorization: `Bearer ${this.authService.getToken}` } };
  // ImgHeader = { headers: [{ Authorization: `Bearer ${this.authService.getToken}` },{responseType: "blob"}] };

  constructor(
    private httpClient: HttpClient,
    private GlobalUrls: GlobalUrl, private authService: AuthService) { }
  baseUrl = environment.baseUrl;


  SaveEnquiry(req): any {
    return this.httpClient.post(`${this.baseUrl}api/Enquiry/SaveEnquiry`, req, this.header);
  }
  GetEnquiryPDF(ID: string) {
    return this.httpClient.get(this.baseUrl + `api/Enquiry/GetEnquiryPDF/` + ID, { responseType: "blob" });
    // return this.httpClient.post(`${this.baseUrl}api/Enquiry/GetEnquiryPDF/${ID}`,  this.ImgHeader);
  }
  DeleteEnquiryPDF(pdfFileName: string) {
    return this.httpClient.get(this.baseUrl + `api/Enquiry/DeleteEnquiryPDF/` + pdfFileName);

  }
  GetPdfDaysLeft(req): any {
    return this.httpClient.post<EnquiryDaysLeftModel>(`${this.baseUrl}api/Enquiry/GetPdfDaysLeft`, req, this.header);
  }

}
