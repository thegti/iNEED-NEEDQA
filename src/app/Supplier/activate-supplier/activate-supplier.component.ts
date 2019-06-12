import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, FormGroupName} from '@angular/forms';

@Component({
  selector: 'app-activate-supplier',
  templateUrl: './activate-supplier.component.html',
  styleUrls: ['./activate-supplier.component.scss']
})
export class ActivateSupplierComponent implements OnInit {
  firstFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
  }

}
