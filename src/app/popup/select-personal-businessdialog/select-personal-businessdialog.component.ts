import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-select-personal-businessdialog',
  templateUrl: './select-personal-businessdialog.component.html',
  styleUrls: ['./select-personal-businessdialog.component.scss']
})
export class SelectPersonalBusinessdialogComponent implements OnInit {

  public Message: string;
  public isError: Boolean = false;

  constructor(
      public PersonalBusinessDialogRef: MatDialogRef<SelectPersonalBusinessdialogComponent>
  )
  {
  }

ngOnInit() {
}

}
