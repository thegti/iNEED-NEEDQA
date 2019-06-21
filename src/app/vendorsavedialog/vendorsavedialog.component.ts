import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-vendorsavedialog',
  templateUrl: './vendorsavedialog.component.html',
  styleUrls: ['./vendorsavedialog.component.scss']
})
export class VendorsavedialogComponent implements OnInit {

  public Message: string;
    public isError: Boolean = false;

    constructor(
        public VendorDialogRef: MatDialogRef<VendorsavedialogComponent>
    )
    {
    }

  ngOnInit() {
  }

}



