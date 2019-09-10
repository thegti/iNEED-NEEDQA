import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-select-keyword',
  templateUrl: './select-keyword.component.html',
  styleUrls: ['./select-keyword.component.scss']
})
export class SelectKeywordComponent implements OnInit {
  public KeywordMessage : string;
  public isError: Boolean = false;
  constructor(
    public keywordialogRef: MatDialogRef<SelectKeywordComponent>
)
{}

  ngOnInit() {
  }

}
