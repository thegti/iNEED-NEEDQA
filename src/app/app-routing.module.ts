import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { PricingComponent } from './pricing/pricing.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { IhaveComponent } from './ihave/ihave.component';
import { SupplierRegistrationComponent } from './supplier-registration/supplier-registration.component';
import { LoginComponent } from './login/login.component';

import { EnquiryComponent } from './enquiry/enquiry.component';
import {ActivateSupplierComponent} from './Supplier/activate-supplier/activate-supplier.component';
import {VendorprofileComponent} from './vendorprofile/vendorprofile.component';
import {VendorlistingComponent} from './vendorlisting/vendorlisting.component';
import {PaymentComponent} from './payment/payment.component';
import {AuthGuard} from './authentication/auth.guard';
import {DownloadsComponent} from './downloads/downloads.component';
import{ReportComponent} from './reportModule/report/report.component';
import {ProfiledefaultComponent} from './profiledefault/profiledefault.component';

// R and D works
// import {SearchautoComponent} from './RandD/searchauto/searchauto.component';
// import {ValidatorsComponent} from './RandD/validators/validators.component';
// import { TestComponent } from './RandD/test/test.component';
// import {DatereportComponent} from './RandD/datereport/datereport.component';



const appRoutes: Routes = [
  
    {
        path: '', 
        redirectTo: '/home',
        pathMatch: 'full'
    },
  
    {
        path: 'home', 
        component: EnquiryComponent
   
    },
    {
        path: 'ActivateSupplier/:key',
        component: ActivateSupplierComponent
    },
    {
        path: 'about', 
        component: AboutComponent
    },
    {
        path: 'faq', 
        component: FaqComponent
    },
    {
        path: 'pricing', 
      
        component: PricingComponent,
        // canActivate: [AuthGuard]
    },
    {
        path: 'terms', 
      
        component: TermsComponent
    },
    {
        path: 'privacy', 
      
        component: PrivacyPolicyComponent
    },
    {
        path: 'contact', 
      
        component: ContactUsComponent
    },
    {
        path: 'ihave', 
      
        component: IhaveComponent
    },
    {
        path: 'login', 
      
        component: LoginComponent
    },
    {
        path: 'supplier', 
      
        component: SupplierRegistrationComponent
    },
    {
        path: 'vendorprofile', 
      
        component: VendorprofileComponent,
        
        canActivate: [AuthGuard]
    },
   
   
    {
        path: 'profile', 
      
        component: ProfiledefaultComponent
    },

       {
        path: 'vendorlisting', 
      
        component: VendorlistingComponent,
        canActivate: [AuthGuard]
       },
       {
        path: 'payment', 
      
        component: PaymentComponent
       },
       {
           path: 'downloads/:key',
           component: DownloadsComponent
       },
       {
        path: 'report',
        component: ReportComponent
    },
    // R and D works

    // {
    //     path: 'searchauto', 
        
    //     component: SearchautoComponent
   
    // },
    // {
    //     path: 'validation', 
        
    //     component: ValidatorsComponent
   
    // },
    // {
    //     path: 'test', 
      
    //     component: TestComponent
    // },
    // {
    //     path: 'date', 
      
    //     component: DatereportComponent
    // },
   
];

@NgModule({

  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
