import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {GlobalUrl} from '../../utility/GlobalUrl';
import {AuthService} from '../../authentication/auth.service';
import { environment } from 'environments/environment';
import {SavaVendorModel} from '../../business-object/VendorObject';



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
 
   
  
}
