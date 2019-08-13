import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalUrl } from '../../utility/GlobalUrl';
import { AuthService } from '../../authentication/auth.service';
import { environment } from 'environments/environment';
import { SavaVendorModel } from '../../business-object/VendorObject';
import { VendorKeywordModel } from '../../business-object/VendorObject';
import { VendorGetModel } from '../../business-object/VendorObject';
import { VendorSalesLeadModel } from '../../business-object/VendorObject';
import { VendorNameModel } from '../../business-object/VendorObject';
import { PlanGetModel } from '../../business-object/VendorObject';

import { ChangeVendorEmailModel } from '../../business-object/VendorObject';
// import {GetVendorListModel} from '../../business-object/VendorObject'




@Injectable({
  providedIn: 'root'
})
export class VendorService {
  header = { headers: { Authorization: `Bearer ${this.authService.getToken}` } };
  constructor(
    private httpClient: HttpClient,
    private GlobalUrls: GlobalUrl, private authService: AuthService) { }
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
    return this.httpClient.post<VendorSalesLeadModel>(`${this.baseUrl}api/Vendor/VendorSalesLeadGet`, req, this.header);
  }
  VendorSalesLeadSave(req): any {
    return this.httpClient.post<VendorSalesLeadModel>(`${this.baseUrl}api/Vendor/VendorSalesLeadSave`, req, this.header);
  }

  VendorKeywordDelete(req): any {
    return this.httpClient.post<VendorSalesLeadModel>(`${this.baseUrl}api/Vendor/VendorKeywordDelete`, req, this.header);
  }

  VendorNameGetAuto(req): any {
    return this.httpClient.post<VendorNameModel>(`${this.baseUrl}api/Vendor/VendorAuto`, req, this.header);
  }

  GetVendorList(req): any {
    return this.httpClient.post<VendorNameModel>(`${this.baseUrl}api/Vendor/VendorGetList`, req, this.header);
  }

  PlanGet(req): any {
    return this.httpClient.post<PlanGetModel>(`${this.baseUrl}api/Vendor/PlanGet`, req, this.header);
  }

  ChangeVendorEmail(req): any {
    return this.httpClient.post<ChangeVendorEmailModel>(`${this.baseUrl}api/Vendor/ChangeVendorEmail`, req, this.header);
  }


}
