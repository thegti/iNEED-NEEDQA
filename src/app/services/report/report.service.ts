import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalUrl } from '../../utility/GlobalUrl';
import { AuthService } from '../../authentication/auth.service';
import { environment } from 'environments/environment';
import { ReportModel } from '../../business-object/CommonDataObject';
import { TotalReferalsRPT } from '../../business-object/ReportObject';
import { TotalReferalsAdminRPT } from '../../business-object/ReportObject';
import { VendorDirectoryRPT } from '../../business-object/ReportObject';
import { ListOfKeywordsRPT } from '../../business-object/ReportObject';
import {PlanwiseCompanyRPT} from '../../business-object/ReportObject';

@Injectable({
    providedIn: 'root'
})
export class ReportService {
    header = { headers: { Authorization: `Bearer ${this.authService.getToken}` } };
    constructor(
        private httpClient: HttpClient,
        private GlobalUrls: GlobalUrl, private authService: AuthService) { }
    baseUrl = environment.baseUrl;


    GetVendorKeywords(req): any {
        return this.httpClient.post<ReportModel>(`${this.baseUrl}api/Reports/GetVendorKeywords`, req, this.header);
    }

    GetTotalReferals(req): any {
        return this.httpClient.post<TotalReferalsRPT>(`${this.baseUrl}api/Reports/GetTotalReferals`, req, this.header);
    }
    GetTotalReferalsAdmin(req): any {
        return this.httpClient.post<TotalReferalsAdminRPT>(`${this.baseUrl}api/Reports/GetTotalReferalsAdmin`, req, this.header);
    }
    GetVendorDirectory(req): any {
        return this.httpClient.post<VendorDirectoryRPT>(`${this.baseUrl}api/Reports/GetVendorDirectory`, req, this.header);
    }
    GetKeywordListAdmin(req): any {
        return this.httpClient.post<ListOfKeywordsRPT>(`${this.baseUrl}api/Reports/GetKeywordListAdmin`, req, this.header);
    }
    GetPlanwiseCompany(req): any {
        return this.httpClient.post<PlanwiseCompanyRPT>(`${this.baseUrl}api/Reports/GetPlanwiseCompany`, req, this.header);
    }
}
