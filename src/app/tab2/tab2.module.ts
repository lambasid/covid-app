import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { OntarioCovidComponent } from '../components/ontario-covid/ontario-covid.component';
import { OntarioRecordsComponent } from '../components/ontario-records/ontario-records.component';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule,
    ComponentsModule
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
