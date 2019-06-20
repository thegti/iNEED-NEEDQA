import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {GlobalUrl} from '../../utility/GlobalUrl';
import {AuthService} from '../../authentication/auth.service';
import { environment } from 'environments/environment';
import {SavaVendorModel} from '../../business-object/VendorObject';
import {VendorKeywordModel} from '../../business-object/VendorObject';
import {VendorGetModel} from '../../business-object/VendorObject';
import {VendorSalesGetModel} from '../../business-object/VendorObject'




@Injectable({
  providedIn: 'root'
})
export class VendorService {
    header = { headers: { Authorization: `Bearer ${this.authService.getToken}` } };
    constructor(
        private httpClient: HttpClient,
        private GlobalUrls: GlobalUrl,private authService: AuthService) { }
        baseUrl = environment.baseUrl;


      SaveVendor(req): any {
        return this.httpClient.post(`${this.baseUrl}api/Vendor/SaveVendor`, req, this.header);
     }  
     
     ActivateVendor(req): any {
      return this.httpClient.post<SavaVendorModel>(`${this.baseUrl}api/Vendor/ActivateVendor`, req, this.header);
   }  

   VendorKeywordGet(req): any {
    return this.httpClient.post<VendorKeywordModel>(`${this.baseUrl}api/Vendor/VendorKeywordGet`, req, this.header);
 }  

 VendorKeywordSave(req): any {
  return this.httpClient.post<VendorKeywordModel>(`${this.baseUrl}api/Vendor/VendorKeywordSave`, req, this.header);
} 

VendorGet(req): any {
  return this.httpClient.post<VendorGetModel>(`${this.baseUrl}api/Vendor/VendorGet`, req, this.header);
} 

GetSalesLeadSetup(req): any {
  return this.httpClient.post<VendorSalesGetModel>(`${this.baseUrl}api/Vendor/GetSalesLeadSetup`, req, this.header);
} 
SaveSalesLeadSetup(req): any {
  return this.httpClient.post<VendorSalesGetModel>(`${this.baseUrl}api/Vendor/SaveSalesLeadSetup`, req, this.header);
} 



 
   
  
}
