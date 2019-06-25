import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { navigation } from 'app/navigation/navigation';
import { ContentModule } from 'app/layout/components/content/content.module';
import { FooterModule } from 'app/layout/components/footer/footer.module';
import { NavbarModule } from 'app/layout/components/navbar/navbar.module';
import { QuickPanelModule } from 'app/layout/components/quick-panel/quick-panel.module';
import { ToolbarModule } from 'app/layout/components/toolbar/toolbar.module';

import { Router, ActivatedRoute } from '@angular/router';
import {SharedData} from '../../../services/common/SharedData.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, FormGroupName} from '@angular/forms';
import { AuthService } from '../../../authentication/auth.service';

import {User} from '../../../authentication/user.model';

@Component({
    selector     : 'horizontal-layout-1',
    templateUrl  : './layout-1.component.html',
    styleUrls    : ['./layout-1.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HorizontalLayout1Component implements OnInit, OnDestroy
{
    fuseConfig: any;
    navigation: any;
    email: String;
    loginform: FormGroup;
    user: User;
    public IsHidewWelcome :boolean=true;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,private _formBuilder: FormBuilder,
        private router: Router,
        private activeRoute: ActivatedRoute,
        private sharedData: SharedData,
        public authService: AuthService,
    )
    {
        // Set the defaults
        this.navigation = navigation;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to config changes
     
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.fuseConfig = config;
            });
            this.email='';
            // this.email=this.sharedData.GetVendorEmail();
            // console.log( this.email);
            // console.log("Welcom->1");
            if(this.email==undefined || this.email==''){
                this.user= this.authService.getUserDetail(); 
                
                console.log("Welcom->2");
                console.log(this.user);
                this.email = this.user.VND_EMAIL;
                this.IsHidewWelcome=false;
            }
            else if(this.email!=undefined && this.email!='')
            {
                this.IsHidewWelcome=false;
            }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
