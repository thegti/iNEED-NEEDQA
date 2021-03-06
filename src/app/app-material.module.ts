import { NgModule } from '@angular/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
// import { MatButtonModule, MatIconModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';
// import {MatFormFieldModule} from '@angular/material/form-field';
import { MatToolbarModule,MatDialogModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { MatStepperModule } from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatRadioModule} from '@angular/material/radio';
import {MatTabsModule} from '@angular/material/tabs';
import { MatDividerModule, MatListModule } from '@angular/material';
import {MatExpansionModule} from '@angular/material';


//Rand D works

import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
    imports: [
        MatMomentDateModule,
        MatCheckboxModule,
        MatButtonModule,
        // MatIconModule,
        MatTooltipModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatStepperModule,
         MatSelectModule,
        MatDatepickerModule,
        MatAutocompleteModule,
        NgxMatSelectSearchModule,
        MatGridListModule,
        MatToolbarModule,
        MatDialogModule,
        MatTabsModule,
        MatDividerModule,
        MatListModule,
        MatExpansionModule
    ],
    exports: [
        MatMomentDateModule,
        MatCheckboxModule,
        MatButtonModule,
        // MatIconModule,
        MatTooltipModule,
        MatTableModule,
        MatPaginatorModule,
        MatStepperModule,
         MatFormFieldModule,
         MatInputModule,
         MatSelectModule,
        MatDatepickerModule,
        MatAutocompleteModule,
         NgxMatSelectSearchModule,
        MatGridListModule,
        MatDialogModule,
        MatRadioModule,
        MatExpansionModule
    ]
  })
  export class AppMaterialModule {}
