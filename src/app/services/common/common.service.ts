import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalUrl } from '../../utility/GlobalUrl';
import { AuthService } from '../../authentication/auth.service';
import { environment } from 'environments/environment';
import { LocationModel } from '../../business-object/CommonDataObject';
import { KeywordModel } from '../../business-object/CommonDataObject';
import { UomModel } from '../../business-object/CommonDataObject';
import { CountryModel } from '../../business-object/CommonDataObject';
import { OtpModel } from '../../business-object/CommonDataObject';
import {CurrencyModel} from '../../business-object/CommonDataObject';

@Injectable({
   providedIn: 'root'
})
export class ApiService {
   header = { headers: { Authorization: `Bearer ${this.authService.getToken}` } };
   constructor(
      private httpClient: HttpClient,
      private GlobalUrls: GlobalUrl, private authService: AuthService) { }
   baseUrl = environment.baseUrl;

   ConstGetAuto(req): any {
      return this.httpClient.post<LocationModel>(`${this.baseUrl}api/Common/ConstGetAuto`, req, this.header);
   }
   KeyWordGetAuto(req): any {
      return this.httpClient.post<KeywordModel>(`${this.baseUrl}api/Common/KeyWordGetAuto`, req, this.header);
   }

   GetUom(req): any {
      return this.httpClient.post<UomModel>(`${this.baseUrl}api/Common/GetUom`, req, this.header);
   }

   CountryFilterGetAuto(req): any {
      return this.httpClient.post<CountryModel>(`${this.baseUrl}api/Common/Country`, req, this.header);
   }

   SelectCountry(req): any {
      return this.httpClient.post<CountryModel>(`${this.baseUrl}api/Common/SelectCountry`, req, this.header);
   }
   GenerateOtp(req): any {
      return this.httpClient.post<OtpModel>(`${this.baseUrl}api/Common/GenerateOTP`, req, this.header);
   }
   ConfigGet(req): any {
      return this.httpClient.post(`${this.baseUrl}api/Common/ConfigGet`, req, this.header);
   }
   GetCurrency(req): any {
      return this.httpClient.post<CurrencyModel>(`${this.baseUrl}api/Common/GetCurrency`, req, this.header);
   }

   registerUserImage(req): any {
      return this.httpClient.post(`${this.baseUrl}api/Common/user/PostAttachments`, req, this.header);
}

UploadCSV(req): any {
   return this.httpClient.post(`${this.baseUrl}api/Common/user/user/UploadCSV`, req, this.header);
}
}
