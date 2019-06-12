import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import {MatTabsModule} from '@angular/material/tabs';
import { RecaptchaModule } from 'ng-recaptcha';
import { DialogComponent } from './dialog/dialog.component';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import {AppMaterialModule} from './app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { TestComponent } from './test/test.component';
import {ActivateSupplierComponent} from './Supplier/activate-supplier/activate-supplier.component';
import {VendorprofileComponent} from './vendorprofile/vendorprofile.component';


// R and D works
import {SearchautoComponent} from './RandD/searchauto/searchauto.component';
import {ValidatorsComponent} from './RandD/validators/validators.component'

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
        TestComponent,
        ActivateSupplierComponent,
        VendorprofileComponent,

        //R and D works

        SearchautoComponent,
        ValidatorsComponent
       
    ],
    entryComponents: [
        DialogComponent,
        
      ],
    imports     : [
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
        AppRoutingModule
    ],
    providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
    bootstrap   : [
        AppComponent
    ],
    
    schemas : [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule
{
}
