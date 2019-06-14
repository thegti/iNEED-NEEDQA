import { Component, OnInit ,Input} from '@angular/core';
import { MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-nextdialog',
  templateUrl: './nextdialog.component.html',
  styleUrls: ['./nextdialog.component.scss']
})
export class NextdialogComponent implements OnInit {
 
  public Message: string;
  public isError: Boolean = false;

  constructor(
      public NextDialogRef: MatDialogRef<NextdialogComponent>
  )
  {
  }
  verifyOtp()
  {
   
  }
  

ngOnInit() {
}

}
