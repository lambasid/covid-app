import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { CanadaCovidComponent } from './canada-covid/canada-covid.component';
import { OntarioCovidComponent } from './ontario-covid/ontario-covid.component';
import { OntarioRecordsComponent } from './ontario-records/ontario-records.component';

@NgModule({
  declarations: [
    CanadaCovidComponent,
    OntarioCovidComponent,
    OntarioRecordsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    CanadaCovidComponent,
    OntarioCovidComponent,
    OntarioRecordsComponent
  ]
})
export class ComponentsModule { } 