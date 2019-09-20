import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FuseConfirmDialogModule } from '@fuse/components/confirm-dialog/confirm-dialog.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { fuseConfig } from 'app/fuse-config';
import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { PricingComponent } from './pricing/pricing.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { IhaveComponent } from './ihave/ihave.component';
import { SupplierRegistrationComponent } from './supplier-registration/supplier-registration.component';
import { MatTabsModule } from '@angular/material/tabs';
import { RecaptchaModule } from 'ng-recaptcha';
import { DialogComponent } from './dialog/dialog.component';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { AppMaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { EnquiryComponent } from './enquiry/enquiry.component';

import { ActivateSupplierComponent } from './Supplier/activate-supplier/activate-supplier.component';
import { VendorprofileComponent } from './vendorprofile/vendorprofile.component';
import { NextdialogComponent } from './popup/nextdialog/nextdialog.component';
import { VendorsavedialogComponent } from './popup/vendorsavedialog/vendorsavedialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendorkeyworddeletedialogComponent } from './popup/vendorkeyworddeletedialog/vendorkeyworddeletedialog.component';
import { VendorlistingComponent } from './vendorlisting/vendorlisting.component';
import { PaymentComponent } from './payment/payment.component';
import { VendorEmailChangedialogComponent } from './popup/vendor-email-changedialog/vendor-email-changedialog.component';
import {SelectProducrServicedialogComponent} from './popup/select-producr-servicedialog/select-producr-servicedialog.component';
import {SelectPersonalBusinessdialogComponent} from './popup/select-personal-businessdialog/select-personal-businessdialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {LoaderComponent} from './components/shared/loader/loader.component';
import { LoaderService } from './services/loader.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {LoaderInterceptor} from './loader.interceptor';
import{DownloadsComponent} from './downloads/downloads.component';
import{ReportComponent} from './reportModule/report/report.component';
import {WebDataRocksPivot} from './reportModule/WebDataRocks/webdatarocks.angular4';
import {SelectKeywordComponent} from './popup/select-keyword/select-keyword.component';
import {ProfiledefaultComponent} from './profiledefault/profiledefault.component';
import { EventEmitterService } from './event-emitter.service';
import { NgxPayPalModule } from 'ngx-paypal';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DATE_LOCALE } from '@angular/material';

// R and D works
import { SearchautoComponent } from './RandD/searchauto/searchauto.component';
import { ValidatorsComponent } from './RandD/validators/validators.component';
import { TestComponent } from './RandD/test/test.component';
import {DatereportComponent} from './RandD/datereport/datereport.component';
import { from } from 'rxjs';



@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        AboutComponent,
        FaqComponent,
        PricingComponent,
        TermsComponent,
        PrivacyPolicyComponent,
        ContactUsComponent,
        IhaveComponent,
        SupplierRegistrationComponent,
        DialogComponent,
        EnquiryComponent,
       
        ActivateSupplierComponent,
        VendorprofileComponent,
        NextdialogComponent,
        VendorsavedialogComponent,
        VendorlistingComponent,
        VendorkeyworddeletedialogComponent,
        PaymentComponent,
        VendorEmailChangedialogComponent,
        SelectProducrServicedialogComponent,
        SelectPersonalBusinessdialogComponent,
        DownloadsComponent,
        ReportComponent,
        WebDataRocksPivot,
        SelectKeywordComponent,
        ProfiledefaultComponent,
        


        //R and D works

        SearchautoComponent,
        ValidatorsComponent,
        TestComponent,
        DatereportComponent,
        LoaderComponent,
        

    ],
    entryComponents: [
        DialogComponent,
        NextdialogComponent,
        VendorsavedialogComponent,
        VendorkeyworddeletedialogComponent,
        VendorEmailChangedialogComponent,
        SelectProducrServicedialogComponent,
        SelectPersonalBusinessdialogComponent,
        SelectKeywordComponent


    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatTabsModule,
        TranslateModule.forRoot(),
        // Material moment date module
        MatMomentDateModule,
        FuseConfirmDialogModule,
        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
        RecaptchaModule,
        RecaptchaFormsModule,
        // App modules
        LayoutModule,
        AppMaterialModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPayPalModule,
        MatProgressSpinnerModule,
        MatDatepickerModule
    
       
    ],
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },
                 EventEmitterService,
                 LoaderService,
                 { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
                 {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}//for convert time format to dd/mm/yy from mm/dd/yy format
                ],
    bootstrap: [
        AppComponent
    ],

    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
