import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-select-producr-servicedialog',
  templateUrl: './select-producr-servicedialog.component.html',
  styleUrls: ['./select-producr-servicedialog.component.scss']
})
export class SelectProducrServicedialogComponent implements OnInit {

  public Message: string;

  public isError: Boolean = false;

  constructor(
      public ProductServiceDialogRef: MatDialogRef<SelectProducrServicedialogComponent>
  )
  {
  }

ngOnInit() {
}

}




