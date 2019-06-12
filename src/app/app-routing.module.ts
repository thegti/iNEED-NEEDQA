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
import { TestComponent } from './test/test.component';
import { EnquiryComponent } from './enquiry/enquiry.component';

const appRoutes: Routes = [
  
    {
        path: '', 
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home', 
        component: EnquiryComponent
    },
    // {
    //     path: 'test', 
    //     component: TestComponent
    // },
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
      
        component: PricingComponent
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
   
];

@NgModule({

  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
