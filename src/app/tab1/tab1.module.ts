import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { CanadaCovidComponent } from '../components/canada-covid/canada-covid.component';
import { OntarioCovidComponent } from '../components/ontario-covid/ontario-covid.component';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    ComponentsModule
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
