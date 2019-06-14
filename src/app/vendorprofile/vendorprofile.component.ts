import { Component, OnInit,ViewChild } from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-vendorprofile',
  templateUrl: './vendorprofile.component.html',
  styleUrls: ['./vendorprofile.component.scss']
})
export class VendorprofileComponent implements OnInit {
public selectedItem='item1';
uploadkeyword:Boolean=true;
selectedfile: File;
imgname: any = '';
imgChange: Boolean = false;
formdt: FormData = new FormData();
filenames:Boolean=true;  
url = '../../assets/loginasset/images/display-img.jpg';
// @ViewChild(MatAccordion) accordion: MatAccordion;
panelOpenState = false;

  constructor() { }

  ngOnInit() {
    this.filenames=true;   
  }
  sidebarMenu(item)
  {
    this.selectedItem=item;
  }
  UploadKeywordButton()
  {
    this.uploadkeyword=false;
  }
  onSelectionchange(event): void{
   
    this.imgChange = true;
     this.selectedfile = event.target.files[0];
     this.imgname = uuid() + '_' + this.selectedfile.name;
     this.formdt.append('image', this.selectedfile , this.imgname);
  
    if (event.target.files && event.target.files[0]) {
     const reader = new FileReader();
 
     reader.readAsDataURL(event.target.files[0]); // read file as data url
 
     reader.onload = (even) => { // called once readAsDataURL is completed
        this.url = even.target['result'];
       
      };
     }
   }

}
