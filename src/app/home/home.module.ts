import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { EndeavorsModule } from '../endeavors/endeavors.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EndeavorsModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}
