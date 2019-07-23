import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-vendorkeyworddeletedialog',
  templateUrl: './vendorkeyworddeletedialog.component.html',
  styleUrls: ['./vendorkeyworddeletedialog.component.scss']
})
export class VendorkeyworddeletedialogComponent implements OnInit {

  public Message: string;
  public CsvMessage :string;
  public isError: Boolean = false;

  constructor(
      public KeywordDialogRef: MatDialogRef<VendorkeyworddeletedialogComponent>
  )
  {
  }

ngOnInit() {
}

}



