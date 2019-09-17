import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthService} from '../authentication/auth.service';
import {User} from '../authentication/user.model';
import {SharedData} from '../services/common/SharedData.service';

@Component({
  selector: 'app-profiledefault',
  templateUrl: './profiledefault.component.html',
  styleUrls: ['./profiledefault.component.scss']
})
export class ProfiledefaultComponent implements OnInit {
  user: User;
  loginVendor: number;

  constructor(private router: Router, public authService: AuthService,private sharedData: SharedData, ) { }

  ngOnInit() {

    this.authService.ChangeVendorID( this.sharedData.GetLoginVendor()).then(() => {
        this.router.navigate(['/vendorprofile/']);
      });
  
    
  }

}
