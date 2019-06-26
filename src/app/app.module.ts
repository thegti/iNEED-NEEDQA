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
import {NextdialogComponent} from './nextdialog/nextdialog.component';
import {VendorsavedialogComponent} from './vendorsavedialog/vendorsavedialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {LogoutComponent} from './logout/logout.component';
import {VendorkeyworddeletedialogComponent} from './vendorkeyworddeletedialog/vendorkeyworddeletedialog.component'
 


// R and D works
import {SearchautoComponent} from './RandD/searchauto/searchauto.component';
import {ValidatorsComponent} from './RandD/validators/validators.component'
import { EventEmitterService } from './event-emitter.service';

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
        NextdialogComponent,
        VendorsavedialogComponent,
        LogoutComponent,
        VendorkeyworddeletedialogComponent,

        //R and D works

        SearchautoComponent,
        ValidatorsComponent
       
    ],
    entryComponents: [
        DialogComponent,
        NextdialogComponent,
        VendorsavedialogComponent,
        VendorkeyworddeletedialogComponent
        
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
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, EventEmitterService],
    bootstrap   : [
        AppComponent
    ],
    
    schemas : [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule
{
}
