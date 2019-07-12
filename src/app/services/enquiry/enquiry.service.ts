import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalUrl } from '../../utility/GlobalUrl';
import { AuthService } from '../../authentication/auth.service';
import { environment } from 'environments/environment';
import { SavaEnquiryModel } from '../../business-object/EnquiryObject';



@Injectable({
  providedIn: 'root'
})
export class EnquiryService {
  header = { headers: { Authorization: `Bearer ${this.authService.getToken}` } };
  constructor(
    private httpClient: HttpClient,
    private GlobalUrls: GlobalUrl, private authService: AuthService) { }
  baseUrl = environment.baseUrl;


  SaveEnquiry(req): any {
    return this.httpClient.post(`${this.baseUrl}api/Enquiry/SaveEnquiry`, req, this.header);
  }



}
